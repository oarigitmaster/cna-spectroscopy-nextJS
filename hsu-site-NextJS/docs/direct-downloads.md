# Controlled direct downloads

The authenticated `GET /api/v1/datasets/{datasetId}/sources/{sourceId}/download?path=...` endpoint streams a single file from CAIR SFTP through the Linux web host to the client. It does not stage another copy or impose a file-size ceiling. The endpoint checks the user's dataset access and hidden paths before opening a stream. HTTP byte ranges support resuming interrupted downloads.

## Capacity controls

- `CAIR_MAX_DIRECT_TRANSFERS` defaults to **2** simultaneous direct streams per Node process; `CAIR_MAX_DIRECT_TRANSFERS_PER_IDENTITY` defaults to **1** per portal user or API client. Excess requests return `429` and `Retry-After: 30`.
- `CAIR_DIRECT_BYTES_PER_SECOND` defaults to **10485760** (10 MiB/s) shared across direct file and ZIP streams in one Node process. Set it according to the web host's spare outbound bandwidth and the CAIR server's capacity. The limit applies to application streams, not other traffic on the host.
- The ZIP endpoint still uses `CAIR_MAX_DOWNLOAD_BYTES` (default **5 GiB**) because preparing an archive requires more server work. For larger collections, use the manifest endpoint and download individual files.
- Directory listings, summaries, and manifests have separate scan slots. These counters and the bandwidth limiter live in Node memory. If the site runs multiple processes or hosts, each has its own limits; put request and connection limits at the Linux reverse proxy for a deployment-wide ceiling.

The web host remains in the data path for the full download, so monitor outbound bandwidth, SFTP sessions, memory, and API latency during a real transfer. A 1 TiB file takes about 29 hours at the default 10 MiB/s ceiling. A web-server restart interrupts the transfer; the client should request a byte range to resume. Check your host and CAIR provider's outbound-data charges before opening the API to widespread bulk use.

## Client example

```powershell
$filePath = "folder/large-file.bin"
$encodedPath = [Uri]::EscapeDataString($filePath)
$url = "https://YOUR-SITE/api/v1/datasets/DATASET/sources/SOURCE/download?path=$encodedPath"
curl.exe -L --fail --retry 5 --retry-delay 30 -C - -H "Authorization: Bearer $accessToken" -o "large-file.bin" "$url"
```

If a resumed request receives `401`, obtain a fresh API token and rerun the command. Keep the token private. The API returns `206` for a valid byte range and `416` for an unsatisfiable one.
