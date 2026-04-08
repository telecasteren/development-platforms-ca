import { BASE_URL, ARTICLES_URL } from "services/config/constants";
import { ApiError } from "services/api/api-error";
import type { ApiArticle } from "services/api/articles/types";

export const getArticleById = async (id: number): Promise<ApiArticle> => {
  const response = await fetch(`${BASE_URL}${ARTICLES_URL}/${id}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new ApiError(
      payload.error ?? payload.message ?? "Fetching article by id failed",
      response.status || 400,
      payload,
    );
  }

  return payload as ApiArticle;
};
