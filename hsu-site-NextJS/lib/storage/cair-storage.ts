import "server-only";

import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";

import { getMaxScanEntries } from "@/lib/downloads/limits";

import {
  Client,
  type ConnectConfig,
  type FileEntry,
  type SFTPWrapper,
  type Stats,
} from "ssh2";

export type CAIRFileEntry = {
  name: string;
  path: string;
  type: "file" | "directory" | "other";
  size: number;
  modifiedAt: number;
};

export type CAIRDirectoryInfo = {
  name: string;
  path: string;
};

const HIDDEN_CAIR_NAMES = new Set([
  "$RECYCLE.BIN",
  "System Volume Information",
  "Iron",
  "Website",
]);

export function isPublicCAIREntry(
  name: string,
): boolean {
  return !HIDDEN_CAIR_NAMES.has(name);
}

export function isPublicCAIRPath(
  relativePath: string,
  hiddenDirectories: readonly string[] = [],
): boolean {
  const hidden = new Set(hiddenDirectories);

  return relativePath
    .split("/")
    .filter(Boolean)
    .every(
      (segment) =>
        isPublicCAIREntry(segment) &&
        !hidden.has(segment),
    );
}

export type CAIRPathSummary = {
  path: string;
  type: "file" | "directory";
  totalBytes: number;
  fileCount: number;
  directoryCount: number;
};

export type CAIRManifestFile = {
  path: string;
  size: number;
  modifiedAt: number;
};

export type CAIRManifest = {
  path: string;
  type: "file" | "directory";
  totalBytes: number;
  fileCount: number;
  directoryCount: number;
  files: CAIRManifestFile[];
};

export type CAIRByteRange = {
  start: number;
  end: number;
};

/*
 * Some ssh2 type versions only declare the path argument
 * for createReadStream(), even though the runtime method
 * supports start and end options.
 */
type CAIRSFTPReadStreamOptions = {
  start?: number;
  end?: number;
};

function getConnectionConfig(): ConnectConfig {
  const host = process.env.CAIR_SFTP_HOST;
  const username =
    process.env.CAIR_SFTP_USERNAME;

  if (!host || !username) {
    throw new Error(
      "CAIR_SFTP_HOST and CAIR_SFTP_USERNAME are required.",
    );
  }

  const port = Number(
    process.env.CAIR_SFTP_PORT ?? "22",
  );

  const password =
    process.env.CAIR_SFTP_PASSWORD;

  const privateKeyInline =
    process.env.CAIR_SFTP_PRIVATE_KEY;

  const privateKeyPath =
    process.env.CAIR_SFTP_PRIVATE_KEY_PATH;

  const privateKey = privateKeyInline
    ? privateKeyInline.replaceAll("\\n", "\n")
    : privateKeyPath
      ? fs.readFileSync(
          privateKeyPath,
          "utf8",
        )
      : undefined;

  if (!password && !privateKey) {
    throw new Error(
      "Configure CAIR_SFTP_PASSWORD or a CAIR SFTP private key.",
    );
  }

  return {
    host,
    port,
    username,
    password,
    privateKey,
    readyTimeout: Number(
      process.env
        .CAIR_SFTP_READY_TIMEOUT_MS ??
        "15000",
    ),
  };
}

function connectSftp(): Promise<{
  client: Client;
  sftp: SFTPWrapper;
}> {
  return new Promise((resolve, reject) => {
    const client = new Client();

    client.once("ready", () => {
      client.sftp((error, sftp) => {
        if (error) {
          client.end();
          reject(error);
          return;
        }

        resolve({
          client,
          sftp,
        });
      });
    });

    client.once("error", (error) => {
      client.end();
      reject(error);
    });

    client.connect(getConnectionConfig());
  });
}

function statSftpPath(
  sftp: SFTPWrapper,
  remotePath: string,
): Promise<Stats> {
  return new Promise((resolve, reject) => {
    sftp.stat(
      remotePath,
      (error, attributes) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(attributes);
      },
    );
  });
}

function readSftpDirectory(
  sftp: SFTPWrapper,
  remotePath: string,
): Promise<FileEntry[]> {
  return new Promise((resolve, reject) => {
    sftp.readdir(
      remotePath,
      (error, entries) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(entries);
      },
    );
  });
}

export function safeRemotePath(
  root: string,
  relativePath = "",
): string {
  if (!isPublicCAIRPath(relativePath)) {
    throw new Error(
      "Requested path is hidden.",
    );
  }

  const rawSegments = relativePath
    .split("/")
    .filter(Boolean);

  if (
    rawSegments.some(
      (segment) =>
        segment === ".." ||
        segment === ".",
    )
  ) {
    throw new Error(
      "Relative path traversal is not allowed.",
    );
  }

  const normalizedRoot = path.posix
    .normalize(`/${root}`)
    .replace(/\/$/, "");

  const requested = path.posix
    .normalize(`/${relativePath}`)
    .replace(/^\/+/, "");

  const resolved = path.posix.normalize(
    `${normalizedRoot}/${requested}`,
  );

  if (
    resolved !== normalizedRoot &&
    !resolved.startsWith(
      `${normalizedRoot}/`,
    )
  ) {
    throw new Error(
      "Requested path is outside the configured dataset root.",
    );
  }

  return resolved;
}

export function getCAIRDirectoryInfo(
  root: string,
): CAIRDirectoryInfo {
  const normalizedRoot = path.posix
    .normalize(root)
    .replace(/\/$/, "");

  return {
    name: path.posix.basename(normalizedRoot),
    path: normalizedRoot,
  };
}

export async function listCAIRDirectory(
  root: string,
  relativePath = "",
): Promise<CAIRFileEntry[]> {
  const remotePath = safeRemotePath(
    root,
    relativePath,
  );

  const { client, sftp } =
    await connectSftp();

  try {
    const entries = await readSftpDirectory(
      sftp,
      remotePath,
    );

    return entries
      .filter(
        (entry) =>
          entry.filename !== "." &&
          entry.filename !== ".." &&
          isPublicCAIREntry(entry.filename),
      )
      .map((entry) => {
        const type = entry.attrs.isDirectory()
          ? "directory"
          : entry.attrs.isFile()
            ? "file"
            : "other";

        const childRelativePath =
          path.posix.join(
            relativePath,
            entry.filename,
          );

        return {
          name: entry.filename,
          path: childRelativePath,
          type,
          size: entry.attrs.size,
          modifiedAt: entry.attrs.mtime,
        } satisfies CAIRFileEntry;
      })
      .sort((left, right) => {
        if (left.type !== right.type) {
          return left.type === "directory"
            ? -1
            : 1;
        }

        return left.name.localeCompare(
          right.name,
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          },
        );
      });
  } finally {
    client.end();
  }
}

export class CAIRRangeNotSatisfiableError
  extends Error {
  readonly fileSize: number;

  constructor(fileSize: number) {
    super(
      "The requested byte range is not satisfiable.",
    );

    this.name =
      "CAIRRangeNotSatisfiableError";

    this.fileSize = fileSize;
  }
}

function parseCAIRByteRange(
  rangeHeader: string | null,
  fileSize: number,
): CAIRByteRange | null {
  if (!rangeHeader) {
    return null;
  }

  /*
   * Only one byte range is supported. Multipart
   * ranges such as bytes=0-99,200-299 are rejected.
   */
  if (
    fileSize <= 0 ||
    !rangeHeader.startsWith("bytes=") ||
    rangeHeader.includes(",")
  ) {
    throw new CAIRRangeNotSatisfiableError(
      fileSize,
    );
  }

  const requestedRange = rangeHeader
    .slice("bytes=".length)
    .trim();

  const match =
    /^(\d*)-(\d*)$/.exec(requestedRange);

  if (!match) {
    throw new CAIRRangeNotSatisfiableError(
      fileSize,
    );
  }

  const startText = match[1];
  const endText = match[2];

  if (!startText && !endText) {
    throw new CAIRRangeNotSatisfiableError(
      fileSize,
    );
  }

  /*
   * Suffix range:
   * Range: bytes=-500
   *
   * Requests the final 500 bytes.
   */
  if (!startText) {
    const suffixLength = Number(endText);

    if (
      !Number.isSafeInteger(suffixLength) ||
      suffixLength <= 0
    ) {
      throw new CAIRRangeNotSatisfiableError(
        fileSize,
      );
    }

    const actualLength = Math.min(
      suffixLength,
      fileSize,
    );

    return {
      start: fileSize - actualLength,
      end: fileSize - 1,
    };
  }

  const start = Number(startText);

  if (
    !Number.isSafeInteger(start) ||
    start < 0 ||
    start >= fileSize
  ) {
    throw new CAIRRangeNotSatisfiableError(
      fileSize,
    );
  }

  /*
   * Open-ended range:
   * Range: bytes=100-
   */
  if (!endText) {
    return {
      start,
      end: fileSize - 1,
    };
  }

  const requestedEnd = Number(endText);

  if (
    !Number.isSafeInteger(requestedEnd) ||
    requestedEnd < start
  ) {
    throw new CAIRRangeNotSatisfiableError(
      fileSize,
    );
  }

  return {
    start,
    end: Math.min(
      requestedEnd,
      fileSize - 1,
    ),
  };
}

export async function openCAIRFile(
  root: string,
  relativePath: string,
  rangeHeader: string | null = null,
) {
  if (!relativePath) {
    throw new Error(
      "A file path is required.",
    );
  }

  const remotePath = safeRemotePath(
    root,
    relativePath,
  );

  const { client, sftp } =
    await connectSftp();

  try {
    const stats = await statSftpPath(
      sftp,
      remotePath,
    );

    if (!stats.isFile()) {
      throw new Error(
        "Requested path is not a file.",
      );
    }

    const range = parseCAIRByteRange(
      rangeHeader,
      stats.size,
    );

    const contentLength = range
      ? range.end - range.start + 1
      : stats.size;

    const createReadStream =
      sftp.createReadStream.bind(
        sftp,
      ) as (
        path: string,
        options?: CAIRSFTPReadStreamOptions,
      ) => ReturnType<
        SFTPWrapper["createReadStream"]
      >;

    const nodeStream = createReadStream(
      remotePath,
      range
        ? {
            start: range.start,
            end: range.end,
          }
        : undefined,
    );

    let connectionClosed = false;

    const closeConnection = () => {
      if (connectionClosed) {
        return;
      }

      connectionClosed = true;
      client.end();
    };

    nodeStream.once(
      "close",
      closeConnection,
    );

    nodeStream.once(
      "error",
      closeConnection,
    );

    return {
      size: stats.size,
      contentLength,
      modifiedAt: stats.mtime,
      range,
      stream: Readable.toWeb(
        nodeStream,
      ) as ReadableStream<Uint8Array>,
    };
  } catch (error) {
    client.end();
    throw error;
  }
}

export async function summarizeCAIRPath(
  root: string,
  relativePath = "",
  hiddenDirectories: readonly string[] = [],
): Promise<CAIRPathSummary> {
  if (!isPublicCAIRPath(relativePath, hiddenDirectories)) {
    throw new Error("Requested path is hidden.");
  }
  const hidden = new Set(hiddenDirectories);
  const remotePath = safeRemotePath(
    root,
    relativePath,
  );

  const maximumEntries =
    getMaxScanEntries();

  const { client, sftp } =
    await connectSftp();

  let scannedEntries = 0;

  function countEntry() {
    scannedEntries += 1;

    if (scannedEntries > maximumEntries) {
      throw new Error(
        `Directory scan exceeded the ` +
          `${maximumEntries.toLocaleString()} ` +
          `entry safety limit.`,
      );
    }
  }

  async function walkDirectory(
    currentRemotePath: string,
  ): Promise<{
    totalBytes: number;
    fileCount: number;
    directoryCount: number;
  }> {
    const entries = await readSftpDirectory(
      sftp,
      currentRemotePath,
    );

    let totalBytes = 0;
    let fileCount = 0;
    let directoryCount = 0;

    for (const entry of entries) {
      if (
        entry.filename === "." ||
        entry.filename === ".." ||
        !isPublicCAIREntry(entry.filename) ||
        hidden.has(entry.filename)
      ) {
        continue;
      }

      countEntry();

      const childRemotePath =
        path.posix.join(
          currentRemotePath,
          entry.filename,
        );

      if (entry.attrs.isFile()) {
        totalBytes += entry.attrs.size;
        fileCount += 1;
        continue;
      }

      if (entry.attrs.isDirectory()) {
        directoryCount += 1;

        const childSummary =
          await walkDirectory(
            childRemotePath,
          );

        totalBytes +=
          childSummary.totalBytes;

        fileCount +=
          childSummary.fileCount;

        directoryCount +=
          childSummary.directoryCount;
      }

      /*
       * Symbolic links and special filesystem
       * entries are intentionally not followed.
       */
    }

    return {
      totalBytes,
      fileCount,
      directoryCount,
    };
  }

  try {
    const attributes = await statSftpPath(
      sftp,
      remotePath,
    );

    countEntry();

    if (attributes.isFile()) {
      return {
        path: relativePath,
        type: "file",
        totalBytes: attributes.size,
        fileCount: 1,
        directoryCount: 0,
      };
    }

    if (!attributes.isDirectory()) {
      throw new Error(
        "Selected path is neither a file nor a directory.",
      );
    }

    const summary =
      await walkDirectory(remotePath);

    return {
      path: relativePath,
      type: "directory",
      totalBytes: summary.totalBytes,
      fileCount: summary.fileCount,
      directoryCount:
        summary.directoryCount,
    };
  } finally {
    client.end();
  }
}

export async function buildCAIRManifest(
  root: string,
  relativePath = "",
  hiddenDirectories: readonly string[] = [],
): Promise<CAIRManifest> {
  if (!isPublicCAIRPath(relativePath, hiddenDirectories)) {
    throw new Error("Requested path is hidden.");
  }
  const hidden = new Set(hiddenDirectories);
  const normalizedRelativePath =
    path.posix
      .normalize(relativePath)
      .replace(/^\/+/, "");

  const cleanRelativePath =
    normalizedRelativePath === "."
      ? ""
      : normalizedRelativePath;

  const remotePath = safeRemotePath(
    root,
    cleanRelativePath,
  );

  const maximumEntries =
    getMaxScanEntries();

  const { client, sftp } =
    await connectSftp();

  const files: CAIRManifestFile[] = [];

  let scannedEntries = 0;
  let directoryCount = 0;
  let totalBytes = 0;

  function countEntry() {
    scannedEntries += 1;

    if (scannedEntries > maximumEntries) {
      throw new Error(
        `Manifest exceeded the ` +
          `${maximumEntries.toLocaleString()} ` +
          `entry safety limit.`,
      );
    }
  }

  async function walkDirectory(
    currentRemotePath: string,
    currentRelativePath: string,
  ): Promise<void> {
    const entries = await readSftpDirectory(
      sftp,
      currentRemotePath,
    );

    for (const entry of entries) {
      if (
        entry.filename === "." ||
        entry.filename === ".." ||
        !isPublicCAIREntry(entry.filename) ||
        hidden.has(entry.filename)
      ) {
        continue;
      }

      countEntry();

      const childRemotePath =
        path.posix.join(
          currentRemotePath,
          entry.filename,
        );

      const childRelativePath =
        path.posix.join(
          currentRelativePath,
          entry.filename,
        );

      if (entry.attrs.isFile()) {
        files.push({
          path: childRelativePath,
          size: entry.attrs.size,
          modifiedAt: entry.attrs.mtime,
        });

        totalBytes += entry.attrs.size;
        continue;
      }

      if (entry.attrs.isDirectory()) {
        directoryCount += 1;

        await walkDirectory(
          childRemotePath,
          childRelativePath,
        );
      }

      /*
       * Symbolic links and special filesystem
       * entries are intentionally ignored.
       */
    }
  }

  try {
    const attributes = await statSftpPath(
      sftp,
      remotePath,
    );

    countEntry();

    if (attributes.isFile()) {
      return {
        path: cleanRelativePath,
        type: "file",
        totalBytes: attributes.size,
        fileCount: 1,
        directoryCount: 0,
        files: [
          {
            path: cleanRelativePath,
            size: attributes.size,
            modifiedAt: attributes.mtime,
          },
        ],
      };
    }

    if (!attributes.isDirectory()) {
      throw new Error(
        "Selected path is neither a file nor a directory.",
      );
    }

    await walkDirectory(
      remotePath,
      cleanRelativePath,
    );

    files.sort((left, right) =>
      left.path.localeCompare(
        right.path,
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        },
      ),
    );

    return {
      path: cleanRelativePath,
      type: "directory",
      totalBytes,
      fileCount: files.length,
      directoryCount,
      files,
    };
  } finally {
    client.end();
  }
}
