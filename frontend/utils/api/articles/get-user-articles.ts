import { BASE_URL, ARTICLES_URL } from "utils/config/constants";

export const getUserArticles = async (token: string) => {
  const response = await fetch(`${BASE_URL}${ARTICLES_URL}/me`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 404) {
    console.log("No articles found for this user.");
    return response.json();
  }

  if (!response.ok) {
    throw new Error(`Fetching user articles failed.`);
  }

  return response.json();
};
