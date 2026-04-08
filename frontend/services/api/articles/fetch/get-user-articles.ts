import { BASE_URL, ARTICLES_URL } from "services/config/constants";
import type { ApiArticle } from "services/api/articles/types";
import { ApiError } from "../../api-error";

export const getUserArticles = async (token: string): Promise<ApiArticle[]> => {
  const response = await fetch(`${BASE_URL}${ARTICLES_URL}/me`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new ApiError("Fetching articles failed", response.status, {
      body: details,
      url: response.url,
    });
  }

  return response.json();
};
