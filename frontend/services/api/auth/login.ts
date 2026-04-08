import { BASE_URL, AUTH_URL, LOGIN_URL } from "services/config/constants";
import { ApiError } from "services/api/api-error";
import type { LoginSuccess } from "./types";

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginSuccess> => {
  const response = await fetch(`${BASE_URL}${AUTH_URL}${LOGIN_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const payload = (await response.json()) as Partial<LoginSuccess> & {
    error?: string;
  };

  if (!response.ok || !payload.token) {
    throw new ApiError(
      payload.error ?? payload.message ?? "Login failed",
      response.status || 401,
      payload,
    );
  }

  return payload as LoginSuccess;
};
