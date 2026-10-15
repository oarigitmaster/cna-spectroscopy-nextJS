import {
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { dynamodb } from "@/lib/aws/dynamodb";

const USER_ACTIVITY_TABLE =
  process.env.USER_ACTIVITY_TABLE ??
  "UserActivity";

export type UserActivityAction =
  | "dataset.view"
  | "source.view"
  | "file.download"
  | "archive.download"
  | "api.request";

export type UserActivityEvent = {
  userID: string;
  action: UserActivityAction;

  datasetID?: string;
  sourceID?: string;
  path?: string;

  fileCount?: number;
  totalBytes?: number;
};

export type StoredUserActivityEvent =
  UserActivityEvent & {
    eventKey: string;
    eventID: string;
    timestamp: string;
  };

export async function logUserActivity(
  event: UserActivityEvent,
): Promise<void> {
  const timestamp =
    new Date().toISOString();

  const eventID =
    crypto.randomUUID();

  const eventKey =
    `${timestamp}#${eventID}`;

  await dynamodb.send(
    new PutCommand({
      TableName: USER_ACTIVITY_TABLE,

      Item: {
        userID: event.userID,
        eventKey,

        eventID,
        timestamp,
        action: event.action,

        datasetID: event.datasetID,
        sourceID: event.sourceID,
        path: event.path,

        fileCount: event.fileCount,
        totalBytes: event.totalBytes,
      },
    }),
  );
}

export async function getUserActivity(
  userID: string,
  limit = 20,
): Promise<StoredUserActivityEvent[]> {
  const result = await dynamodb.send(
    new QueryCommand({
      TableName: USER_ACTIVITY_TABLE,

      KeyConditionExpression:
        "userID = :userID",

      ExpressionAttributeValues: {
        ":userID": userID,
      },

      ScanIndexForward: false,
      Limit: limit,
    }),
  );

  return (
    result.Items as
      | StoredUserActivityEvent[]
      | undefined
  ) ?? [];
}