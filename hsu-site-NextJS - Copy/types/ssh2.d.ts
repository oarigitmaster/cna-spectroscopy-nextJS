declare module "ssh2" {
  import type { Readable } from "node:stream";

  export type ConnectConfig = {
    host: string;
    port?: number;
    username: string;
    password?: string;
    privateKey?: string | Buffer;
    readyTimeout?: number;
  };

  export type Stats = {
    size: number;
    mtime: number;
    isDirectory(): boolean;
    isFile(): boolean;
  };

  export type FileEntry = {
    filename: string;
    attrs: Stats;
  };

  export interface SFTPWrapper {
    readdir(path: string, callback: (error: Error | undefined, list: FileEntry[]) => void): void;
    stat(path: string, callback: (error: Error | undefined, attributes: Stats) => void): void;
    createReadStream(path: string): Readable;
  }

  export class Client {
    once(event: "ready", listener: () => void): this;
    once(event: "error", listener: (error: Error) => void): this;
    connect(config: ConnectConfig): this;
    sftp(callback: (error: Error | undefined, sftp: SFTPWrapper) => void): void;
    end(): void;
  }
}
