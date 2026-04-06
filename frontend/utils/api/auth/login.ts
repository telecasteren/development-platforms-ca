import { BASE_URL, AUTH_URL, LOGIN_URL } from "utils/config/constants";

export type LoginSuccess = {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
  };
};
export class AuthApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export type ActionError = { error: string };

export const toActionError = (error: unknown): ActionError => {
  if (error instanceof AuthApiError) {
    return { error: error.message };
  }
  return { error: "Unexpected error. Please try again." };
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginSuccess> => {
  const response = await fetch(`${BASE_URL}${AUTH_URL}${LOGIN_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const payload = (await response.json()) as Partial<LoginSuccess> & {
    error?: string;
  };

  if (!response.ok || !payload.token) {
    throw new AuthApiError(
      payload.error ?? payload.message ?? "Login failed",
      response.status || 401,
    );
  }

  return payload as LoginSuccess;
};
