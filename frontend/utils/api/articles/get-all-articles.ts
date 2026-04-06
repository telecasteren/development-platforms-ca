import { BASE_URL, ARTICLES_URL } from "utils/config/constants";

export const getAllArticles = async () => {
  const response = await fetch(`${BASE_URL}${ARTICLES_URL}`);

  if (response.status === 404) {
    console.log("No articles found.");
    return response.json();
  }

  if (!response.ok) {
    throw new Error(`Fetching articles failed.`);
  }

  return await response.json();
};
