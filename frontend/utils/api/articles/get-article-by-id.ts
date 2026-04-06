import { BASE_URL, ARTICLES_URL } from "utils/config/constants";

export const getArticleById = async (id: number) => {
  const response = await fetch(`${BASE_URL}${ARTICLES_URL}/${id}`);

  if (response.status === 404) {
    console.log("No article found for that id.");
    return response.json();
  }

  if (!response.ok) {
    throw new Error(`Fetching article by id failed.`);
  }

  return await response.json();
};
