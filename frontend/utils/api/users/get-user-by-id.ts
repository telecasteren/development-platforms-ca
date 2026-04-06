import { BASE_URL, USERS_URL } from "utils/config/constants";

export const getUserById = async (id: number) => {
  const response = await fetch(`${BASE_URL}${USERS_URL}/${id}`);

  if (response.status === 404) {
    console.log("No user found for that id.");
    return response.json();
  }

  if (!response.ok) {
    throw new Error(`Fetching user by id failed.`);
  }

  return await response.json();
};
