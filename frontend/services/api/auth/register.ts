import { BASE_URL, AUTH_URL, REGISTER_URL } from "services/config/constants";
import { ApiError } from "services/api/api-error";
import type { RegisterSuccess } from "./types";

export const registerUser = async (
  email: string,
  password: string,
): Promise<RegisterSuccess> => {
  const response = await fetch(`${BASE_URL}${AUTH_URL}${REGISTER_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const payload = (await response.json()) as Partial<RegisterSuccess> & {
    error?: string;
  };

  if (!response.ok) {
    throw new ApiError(
      payload.error ?? payload.message ?? "Registration failed",
      response.status || 400,
      payload,
    );
  }

  return payload as RegisterSuccess;
};
