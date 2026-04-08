import type { Route } from "./+types/login";
import type { ActionData } from "../types";
import { createAuthSession, requireGuest } from "services/session.server";
import { loginUser } from "services/api/auth/login";
import { ApiError } from "services/api/api-error";
import { registerUser } from "services/api/auth/register";
import { parseCredentials } from "services/helpers/form-data-parsing";

type AuthMode = "login" | "register";

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireGuest(request, "/users/articles");
  return null;
};

export const createAuthAction =
  (mode: AuthMode) =>
  async ({ request }: Route.ActionArgs) => {
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
      if (error instanceof ApiError) {
        return { error: error.message } satisfies ActionData;
      }
      return { error: "Unexpected auth error" } satisfies ActionData;
    }
  };
