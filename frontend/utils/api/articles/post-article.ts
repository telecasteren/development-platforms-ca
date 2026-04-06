import { BASE_URL, ARTICLES_URL } from "utils/config/constants";
import { authFetch } from "utils/config/auth-fetch";

export const postArticle = async (
  title: string,
  body: string,
  user: number,
) => {
  const articleData = [title, body, user];

  const response = await authFetch(`${BASE_URL}${ARTICLES_URL}`, {
    method: "POST",
    body: JSON.stringify(articleData),
  });

  if (!response.ok) {
    let message = `Error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return await response.json();
};
