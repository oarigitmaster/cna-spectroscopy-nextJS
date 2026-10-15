import { NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  logUserActivity,
  type UserActivityAction,
} from "@/lib/users/activity";

const ALLOWED_ACTIONS: UserActivityAction[] = [
  "dataset.view",
  "source.view",
];

export async function POST(
  request: Request,
) {
  const session = await auth();

  const userID =
    session?.user?.id;

  if (!userID) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON body",
      },
      {
        status: 400,
      },
    );
  }

  if (
    typeof body !== "object" ||
    body === null
  ) {
    return NextResponse.json(
      {
        error: "Invalid request",
      },
      {
        status: 400,
      },
    );
  }

  const {
    action,
    datasetID,
    sourceID,
  } = body as {
    action?: unknown;
    datasetID?: unknown;
    sourceID?: unknown;
  };

  if (
    typeof action !== "string" ||
    !ALLOWED_ACTIONS.includes(
      action as UserActivityAction,
    )
  ) {
    return NextResponse.json(
      {
        error: "Invalid activity action",
      },
      {
        status: 400,
      },
    );
  }

  await logUserActivity({
    userID,
    action:
      action as UserActivityAction,

    datasetID:
      typeof datasetID === "string"
        ? datasetID
        : undefined,

    sourceID:
      typeof sourceID === "string"
        ? sourceID
        : undefined,
  });

  return NextResponse.json({
    ok: true,
  });
}