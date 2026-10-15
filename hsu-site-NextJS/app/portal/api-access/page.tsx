import type { Metadata } from "next";

import ApiCodeBlock from "./ApiCodeBlock";
import styles from "./api-access.module.css";

export const metadata: Metadata = {
  title: "API Access",
  description:
    "Instructions for accessing CNA Spectroscopy Lab datasets through the data API.",
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:3000";

const cognitoDomain =
  process.env.NEXT_PUBLIC_COGNITO_DOMAIN ??
  "https://us-east-1idveenhyu.auth.us-east-1.amazoncognito.com";

const apiScope =
  process.env.NEXT_PUBLIC_COGNITO_API_SCOPE ??
  "cna-data-api/download";

const requestTokenCommand =
  `$clientId = "YOUR_CLIENT_ID"; ` +
  `$secureSecret = Read-Host "Enter your client secret" -AsSecureString; ` +
  `$clientSecret = [System.Net.NetworkCredential]::new("", $secureSecret).Password; ` +
  `$credentials = "\${clientId}:\${clientSecret}"; ` +
  `$encodedCredentials = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($credentials)); ` +
  `$domain = "${cognitoDomain}"; ` +
  `$tokenResponse = Invoke-RestMethod -Method Post -Uri "$domain/oauth2/token" ` +
  `-Headers @{ Authorization = "Basic $encodedCredentials"; Accept = "application/json" } ` +
  `-ContentType "application/x-www-form-urlencoded" ` +
  `-Body "grant_type=client_credentials&scope=${encodeURIComponent(apiScope)}"; ` +
  `$accessToken = $tokenResponse.access_token`;

const listDatasetsCommand =
  `Invoke-RestMethod -Method Get ` +
  `-Uri "${apiBaseUrl}/api/v1/datasets" ` +
  `-Headers @{ Authorization = "Bearer $accessToken" }`;

const browseFolderCommand =
  `$folderPath = "1M-10-0001/LWIR"; ` +
  `$encodedPath = [Uri]::EscapeDataString($folderPath); ` +
  `Invoke-RestMethod -Method Get ` +
  `-Uri "${apiBaseUrl}/api/v1/datasets/pasadena/sources/raw/files?path=$encodedPath" ` +
  `-Headers @{ Authorization = "Bearer $accessToken" }`;

const manifestCommand =
  `$folderPath = "1M-10-0001/LWIR"; ` +
  `$encodedPath = [Uri]::EscapeDataString($folderPath); ` +
  `Invoke-RestMethod -Method Get ` +
  `-Uri "${apiBaseUrl}/api/v1/datasets/pasadena/sources/raw/manifest?path=$encodedPath" ` +
  `-Headers @{ Authorization = "Bearer $accessToken" }`;

const downloadCommand =
  `$filePath = "1M-10-0001/LWIR/REPLACE_WITH_FILE.hdr"; ` +
  `$encodedPath = [Uri]::EscapeDataString($filePath); ` +
  `$downloadUrl = "${apiBaseUrl}/api/v1/datasets/pasadena/sources/raw/download?path=$encodedPath"; ` +
  `curl.exe -L --fail --retry 5 -C - ` +
  `-o "REPLACE_WITH_FILE.hdr" ` +
  `-H "Authorization: Bearer $accessToken" ` +
  `"$downloadUrl"`;

const rangeCommand =
  `$filePath = "1M-10-0001/LWIR/REPLACE_WITH_FILE.hdr"; ` +
  `$encodedPath = [Uri]::EscapeDataString($filePath); ` +
  `$downloadUrl = "${apiBaseUrl}/api/v1/datasets/pasadena/sources/raw/download?path=$encodedPath"; ` +
  `curl.exe -L --fail ` +
  `-H "Authorization: Bearer $accessToken" ` +
  `-H "Range: bytes=0-99" ` +
  `-o "first-100-bytes.bin" ` +
  `"$downloadUrl"`;

const pythonExample = `import requests

API_BASE_URL = "${apiBaseUrl}"
ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"

headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN}"
}

response = requests.get(
    f"{API_BASE_URL}/api/v1/datasets",
    headers=headers,
    timeout=60,
)

response.raise_for_status()

for dataset in response.json():
    print(dataset)`;

export default function ApiAccessPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>
          DATA PORTAL
        </div>

        <h1>API access</h1>

        <p className={styles.heroText}>
          Use the CNA Spectroscopy Lab API to
          browse and download the datasets
          assigned to your organization.
        </p>

        <div className={styles.heroMeta}>
          <span>
            OAuth 2.0
          </span>

          <span>
            Resumable downloads
          </span>

          <span>
            Restricted access
          </span>
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav
            className={styles.tableOfContents}
            aria-label="API guide sections"
          >
            <p>On this page</p>

            <a href="#overview">
              Overview
            </a>

            <a href="#credentials">
              Credentials
            </a>

            <a href="#token">
              Access token
            </a>

            <a href="#datasets">
              List datasets
            </a>

            <a href="#browse">
              Browse folders
            </a>

            <a href="#manifest">
              Create a manifest
            </a>

            <a href="#download">
              Download files
            </a>

            <a href="#python">
              Python example
            </a>

            <a href="#errors">
              Error codes
            </a>
          </nav>
        </aside>

        <div className={styles.content}>
          <section
            id="overview"
            className={styles.section}
          >
            <h2>Overview</h2>

            <p>
              The API provides programmatic
              access to the same datasets
              available through the portal.
              Every request is checked against
              the datasets assigned to your API
              client.
            </p>

            <div className={styles.notice}>
              <div
                className={styles.noticeIcon}
                aria-hidden="true"
              >
                i
              </div>

              <div>
                <strong>
                  API base URL
                </strong>

                <code>{apiBaseUrl}</code>
              </div>
            </div>
          </section>

          <section
            id="credentials"
            className={styles.section}
          >
            <h2>1. Obtain API credentials</h2>

            <p>
              CNA will provide your organization
              with a Cognito Client ID and client
              secret. These are machine
              credentials and are separate from
              your normal portal login.
            </p>

            <div className={styles.warning}>
              <strong>
                Protect your client secret
              </strong>

              <p>
                Never place it in browser code,
                commit it to Git, include it in a
                public script, or send it through
                an unsecured channel.
              </p>
            </div>

            <dl className={styles.definitionList}>
              <div>
                <dt>Authentication</dt>
                <dd>
                  OAuth 2.0 client credentials
                </dd>
              </div>

              <div>
                <dt>Scope</dt>
                <dd>
                  <code>{apiScope}</code>
                </dd>
              </div>

              <div>
                <dt>Token lifetime</dt>
                <dd>Approximately 60 minutes</dd>
              </div>
            </dl>
          </section>

          <section
            id="token"
            className={styles.section}
          >
            <h2>2. Request an access token</h2>

            <p>
              Open PowerShell and run the
              following command. Replace
              <code> YOUR_CLIENT_ID </code>
              with the Client ID supplied by CNA.
              PowerShell will securely prompt you
              for the client secret.
            </p>

            <ApiCodeBlock
              code={requestTokenCommand}
            />

            <p>
              The resulting access token is saved
              in
              <code> $accessToken</code>. Request
              a new token after it expires.
            </p>
          </section>

          <section
            id="datasets"
            className={styles.section}
          >
            <h2>3. List authorized datasets</h2>

            <p>
              This returns only the datasets your
              API client is authorized to access.
            </p>

            <ApiCodeBlock
              code={listDatasetsCommand}
            />
          </section>

          <section
            id="browse"
            className={styles.section}
          >
            <h2>4. Browse folders</h2>

            <p>
              Supply the dataset ID, source ID,
              and optional folder path. Folder
              paths must be URL encoded.
            </p>

            <ApiCodeBlock
              code={browseFolderCommand}
            />

            <div className={styles.endpoint}>
              <span className={styles.method}>
                GET
              </span>

              <code>
                /api/v1/datasets/{"{datasetId}"}
                /sources/{"{sourceId}"}
                /files?path={"{folderPath}"}
              </code>
            </div>
          </section>

          <section
            id="manifest"
            className={styles.section}
          >
            <h2>5. Create a download manifest</h2>

            <p>
              A manifest recursively lists every
              downloadable file under the
              selected folder, along with file
              sizes and modification dates. Use
              it to plan or automate bulk
              downloads.
            </p>

            <ApiCodeBlock
              code={manifestCommand}
            />
          </section>

          <section
            id="download"
            className={styles.section}
          >
            <h2>6. Download a file</h2>

            <p>
              The download endpoint streams files
              without loading the entire file
              into server memory. The
              <code> -C -</code> option tells
              curl to resume an incomplete local
              download.
            </p>

            <ApiCodeBlock
              code={downloadCommand}
            />

            <h3>Request a specific byte range</h3>

            <p>
              The API supports HTTP byte ranges.
              This example downloads only the
              first 100 bytes.
            </p>

            <ApiCodeBlock
              code={rangeCommand}
            />
          </section>

          <section
            id="python"
            className={styles.section}
          >
            <h2>7. Python example</h2>

            <p>
              Python clients can make the same
              authenticated API requests using
              the requests package.
            </p>

            <ApiCodeBlock
              code={pythonExample}
              label="Python"
            />
          </section>

          <section
            id="errors"
            className={styles.section}
          >
            <h2>Error codes</h2>

            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Meaning</th>
                    <th>Recommended action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <code>400</code>
                    </td>
                    <td>
                      Invalid or missing path
                    </td>
                    <td>
                      Check the request parameters.
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <code>401</code>
                    </td>
                    <td>
                      Missing, invalid, or expired
                      token
                    </td>
                    <td>
                      Request a new access token.
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <code>403</code>
                    </td>
                    <td>
                      Required OAuth scope is
                      missing
                    </td>
                    <td>
                      Contact CNA to check the API
                      client configuration.
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <code>404</code>
                    </td>
                    <td>
                      Dataset, source, folder, or
                      file not found
                    </td>
                    <td>
                      Check the IDs and path against
                      the listing response.
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <code>416</code>
                    </td>
                    <td>
                      Requested byte range is
                      outside the file
                    </td>
                    <td>
                      Restart the download or
                      remove the incomplete local
                      file.
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <code>502</code>
                    </td>
                    <td>
                      The storage server could not
                      complete the request
                    </td>
                    <td>
                      Retry later or contact CNA
                      support.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.support}>
            <div>
              <h2>Need assistance?</h2>

              <p>
                Contact the CNA Spectroscopy Lab
                if you need credentials, additional
                dataset access, or help with a
                failed download.
              </p>
            </div>

            <a href="/contact">
              Contact the lab
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}