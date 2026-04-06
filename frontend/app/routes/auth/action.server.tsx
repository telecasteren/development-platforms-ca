import type { Route } from "./+types/login";
import { createAuthSession, requireGuest } from "utils/session.server";
import { loginUser, AuthApiError } from "utils/api/auth/login";
import { registerUser } from "utils/api/auth/register";
import { parseCredentials } from "utils/helpers/form-data-parsing";
import type { ActionFunctionArgs } from "react-router";

export type ActionData = { error: string } | null;

type AuthMode = "login" | "register";

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireGuest(request, "/users/articles");
  return null;
};

export const createAuthAction =
  (mode: AuthMode) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const parsedFormData = parseCredentials(formData);

    if (!parsedFormData.ok) {
      return { error: parsedFormData.error };
    }

    const { email, password } = parsedFormData.value;

    try {
      if (mode === "register") {
        await registerUser(email, password);
      }

      const login = await loginUser(
        parsedFormData.value.email,
        parsedFormData.value.password,
      );
      return createAuthSession(request, login.token, "/users/articles");
    } catch (error) {
      if (error instanceof AuthApiError) {
        return { error: error.message } satisfies ActionData;
      }
      return { error: "Unexpected auth error" } satisfies ActionData;
    }
  };
