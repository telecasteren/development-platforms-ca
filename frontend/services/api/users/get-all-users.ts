import { BASE_URL, USERS_URL } from "services/config/constants";
import type { ApiUser } from "~/routes/users/types";
import { ApiError } from "../api-error";

export const getAllUsers = async (token: string): Promise<ApiUser[]> => {
  const response = await fetch(`${BASE_URL}${USERS_URL}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new ApiError("Fetching users failed", response.status, {
      body: details,
      url: response.url,
    });
  }

  return response.json();
};
