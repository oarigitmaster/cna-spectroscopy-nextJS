import {
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { dynamodb } from "@/lib/aws/dynamodb";

const USER_PROFILES_TABLE =
  process.env.USER_PROFILES_TABLE ??
  "UserProfiles";

export type UserProfile = {
  userID: string;
  email: string;
  displayName: string;
  organization?: string;
  jobTitle?: string;
  status: "active" | "disabled";
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
};

export async function getUserProfile(
  userID: string,
): Promise<UserProfile | null> {
  const result = await dynamodb.send(
    new GetCommand({
      TableName: USER_PROFILES_TABLE,
      Key: {
        userID,
      },
    }),
  );

  return (
    (result.Item as UserProfile | undefined) ??
    null
  );
}

export async function createUserProfile(
  profile: UserProfile,
): Promise<void> {
  await dynamodb.send(
    new PutCommand({
      TableName: USER_PROFILES_TABLE,

      Item: profile,

      ConditionExpression:
        "attribute_not_exists(userID)",
    }),
  );
}

export async function ensureUserProfile({
  userID,
  email,
  displayName,
}: {
  userID: string;
  email: string;
  displayName: string;
}): Promise<UserProfile> {
  const existingProfile =
    await getUserProfile(userID);

  const now = new Date().toISOString();

  if (existingProfile) {
    await dynamodb.send(
      new UpdateCommand({
        TableName: USER_PROFILES_TABLE,

        Key: {
          userID,
        },

        UpdateExpression:
            "SET email = :email, " +
            "displayName = :displayName, " +
            "updatedAt = :updatedAt, " +
            "lastActiveAt = :lastActiveAt",

        ExpressionAttributeValues: {
            ":email": email,
            ":displayName": displayName,
            ":updatedAt": now,
            ":lastActiveAt": now,
        },
      }),
    );

    return {
        ...existingProfile,
        email,
        displayName,
        updatedAt: now,
        lastActiveAt: now,
        };
    }

  const profile: UserProfile = {
    userID,
    email,
    displayName,
    status: "active",
    createdAt: now,
    updatedAt: now,
    lastActiveAt: now,
  };

  await createUserProfile(profile);

  return profile;
}

export async function updateUserProfileDetails({
  userID,
  organization,
  jobTitle,
}: {
  userID: string;
  organization: string;
  jobTitle: string;
}): Promise<void> {
  const now = new Date().toISOString();

  await dynamodb.send(
    new UpdateCommand({
      TableName: USER_PROFILES_TABLE,

      Key: {
        userID,
      },

      UpdateExpression:
        "SET organization = :organization, " +
        "jobTitle = :jobTitle, " +
        "updatedAt = :updatedAt",

      ExpressionAttributeValues: {
        ":organization": organization,
        ":jobTitle": jobTitle,
        ":updatedAt": now,
      },

      ConditionExpression:
        "attribute_exists(userID)",
    }),
  );
}