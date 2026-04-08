import { BASE_URL, ARTICLES_URL } from "services/config/constants";
import { ApiError } from "services/api/api-error";
import type { ApiArticle } from "services/api/articles/types";

export const getAllArticles = async (): Promise<ApiArticle[]> => {
  const response = await fetch(`${BASE_URL}${ARTICLES_URL}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new ApiError(
      payload.error ?? payload.message ?? "Get all articles failed",
      response.status || 400,
      payload,
    );
  }

  return payload as ApiArticle[];
};
