import { BASE_URL, USERS_URL } from "services/config/constants";
import type { ApiUser } from "~/routes/users/types";
import { ApiError } from "../api-error";

export const getUserById = async (id: number): Promise<ApiUser> => {
  const response = await fetch(`${BASE_URL}${USERS_URL}/${id}`);

  if (!response.ok) {
    const details = await response.text();
    throw new ApiError("Fetching user by id failed", response.status, {
      body: details,
      url: response.url,
    });
  }

  return await response.json();
};
