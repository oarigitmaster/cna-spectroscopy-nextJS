import "server-only";

import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import {
  verifyCAIRAPIToken,
} from "@/lib/cair/api-token";

export type CAIRRequestIdentity =
  | {
      kind: "portal-user";
      userID: string;
      email: string;
    }
  | {
      kind: "api-client";
      clientId: string;
    };

function extractBearerToken(
  request: NextRequest,
): string | null {
  const authorization =
    request.headers.get("authorization");

  if (!authorization) {
    return null;
  }

  const match =
    authorization.match(
      /^Bearer\s+(.+)$/i,
    );

  return match?.[1]?.trim() || null;
}

export async function getCAIRRequestIdentity(
  request: NextRequest,
): Promise<CAIRRequestIdentity | null> {
  const bearerToken =
    extractBearerToken(request);

  /*
   * When the caller supplies a bearer token,
   * authenticate it as an API request.
   *
   * An invalid bearer token must not fall back to
   * a browser session.
   */
  if (bearerToken) {
    return verifyCAIRAPIToken(
      bearerToken,
    );
  }

  /*
   * Requests without bearer tokens can continue
   * using the existing portal session.
   */
  const session = await auth();

  const userID =
    session?.user?.id;

  const email =
    session?.user?.email;

  if (!userID || !email) {
    return null;
  }

  return {
    kind: "portal-user",
    userID,
    email,
  };
}