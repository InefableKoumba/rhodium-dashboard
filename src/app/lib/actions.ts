"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../../auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      console.log(error);
      switch (type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        case "CallbackRouteError":
          return cause?.err?.toString();
        default:
          throw error;
      }
    }
    throw error;
  }
}
