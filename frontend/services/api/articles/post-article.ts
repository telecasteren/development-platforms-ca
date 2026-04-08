import { BASE_URL, ARTICLES_URL } from "services/config/constants";
import type { PartialApiArticleData } from "./types";
import type { ApiArticle } from "services/api/articles/types";
import { ApiError } from "../api-error";

export const postArticle = async (
  token: string,
  articleData: PartialApiArticleData,
) => {
  const article = articleData;

  const response = await fetch(`${BASE_URL}${ARTICLES_URL}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(article),
  });

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
