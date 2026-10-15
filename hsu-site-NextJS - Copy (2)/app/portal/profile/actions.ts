"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  updateUserProfileDetails,
} from "@/lib/users/profiles";

export async function updateProfile(
  formData: FormData,
) {
  const session = await auth();

  const userID = session?.user?.id;

  if (!userID) {
    redirect("/login");
  }

  const organization =
    formData.get("organization");

  const jobTitle =
    formData.get("jobTitle");

  const normalizedOrganization =
    typeof organization === "string"
      ? organization.trim()
      : "";

  const normalizedJobTitle =
    typeof jobTitle === "string"
      ? jobTitle.trim()
      : "";

  if (
    normalizedOrganization.length > 150 ||
    normalizedJobTitle.length > 150
  ) {
    throw new Error(
      "Profile fields must be 150 characters or fewer.",
    );
  }

  await updateUserProfileDetails({
    userID,
    organization:
      normalizedOrganization,
    jobTitle: normalizedJobTitle,
  });

  revalidatePath("/portal/profile");

  redirect("/portal/profile?updated=true");
}