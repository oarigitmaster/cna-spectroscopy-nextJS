import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getAuthorizedCAIRDatasets } from "@/lib/cair/service";

export default async function CAIRDatasetsPage() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const datasets = getAuthorizedCAIRDatasets(email);

  return (
    <main className="portal-content-page">
      <p className="eyebrow">Client data portal</p>
      <h1>Your available datasets</h1>

      <p>
        Browse and download data collections assigned to your account.
      </p>

      <div className="card-grid">
        {datasets.map((dataset) => (
          <article className="service-card" key={dataset.id}>
            <p className="eyebrow">
              {dataset.category ?? "Dataset"}
            </p>

            <h2>{dataset.title}</h2>

            {dataset.description ? (
              <p>{dataset.description}</p>
            ) : null}

            <p>
              <strong>
                {dataset.sources.length}{" "}
                {dataset.sources.length === 1
                  ? "data collection"
                  : "data collections"}
              </strong>
            </p>

            <Link
              className="text-link"
              href={`/portal/datasets/${dataset.id}`}
            >
              Browse dataset →
            </Link>
          </article>
        ))}

        {!datasets.length ? (
          <div className="empty-state">
            <h2>No datasets assigned</h2>
            <p>
              Your account does not currently have access to any datasets.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}