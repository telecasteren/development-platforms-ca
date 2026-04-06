import { BASE_URL, AUTH_URL, REGISTER_URL } from "utils/config/constants";
import { AuthApiError } from "./login";

export type RegisterSuccess = {
  message: string;
  user: { id: number; email: string };
};

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
    throw new AuthApiError(
      payload.error ?? payload.message ?? "Registration failed",
      response.status || 400,
    );
  }

  return payload as RegisterSuccess;
};
