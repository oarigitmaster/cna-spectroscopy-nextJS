import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getCAIRRequestIdentity,
} from "@/lib/cair/request-identity";
import {
  getAuthorizedCAIRDatasetsForIdentity,
} from "@/lib/cair/request-authorization";
import {
  publicCAIRDatasetMetadata,
} from "@/lib/cair/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
) {
  const identity =
    await getCAIRRequestIdentity(
      request,
    );

  if (!identity) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const datasets =
    getAuthorizedCAIRDatasetsForIdentity(
      identity,
    ).map(
      publicCAIRDatasetMetadata,
    );

  return NextResponse.json({
    datasets,
   });
}