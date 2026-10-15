import "server-only";

import {
  CognitoJwtVerifier,
} from "aws-jwt-verify";

import {
  getCAIRAPIClientAccessMap,
} from "@/lib/cair/config";

const userPoolId =
  process.env.CAIR_COGNITO_USER_POOL_ID;

if (!userPoolId) {
  throw new Error(
    "CAIR_COGNITO_USER_POOL_ID is required.",
  );
}

const requiredScope =
  process.env.CAIR_API_REQUIRED_SCOPE ??
  "cna-data-api/download";

const verifier =
  CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: "access",

    /*
     * Client IDs are checked against our permission
     * configuration after signature verification.
     */
    clientId: null,
  });

export type CAIRAPITokenIdentity = {
  kind: "api-client";
  clientId: string;
};

export async function verifyCAIRAPIToken(
  token: string,
): Promise<CAIRAPITokenIdentity | null> {
  try {
    const payload =
      await verifier.verify(token);

    const clientId =
      payload.client_id;

    if (
      typeof clientId !== "string" ||
      !clientId
    ) {
      return null;
    }

    const scopes =
      typeof payload.scope === "string"
        ? payload.scope.split(/\s+/)
        : [];

    if (!scopes.includes(requiredScope)) {
      return null;
    }

    /*
     * Only app clients explicitly included in the
     * permission map are accepted.
     */
    const accessMap =
      getCAIRAPIClientAccessMap();

    if (!(clientId in accessMap)) {
      return null;
    }

    return {
      kind: "api-client",
      clientId,
    };
  } catch (error) {
    console.warn(
      "Cognito API token verification failed:",
      error instanceof Error
        ? error.message
        : "Unknown verification error",
    );

    return null;
  }
}