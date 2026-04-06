import { BASE_URL, USERS_URL } from "utils/config/constants";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const getAllUsers = async (token: string) => {
  const response = await fetch(`${BASE_URL}${USERS_URL}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new ApiError(
      `Fetching users failed (${response.status}): ${details}`,
      response.status,
    );
  }

  return await response.json();
};
