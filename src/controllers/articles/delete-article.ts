import { pool } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { Article } from "../../models/article.js";

/**
 * Deletes an existing article owned by the authenticated user.
 *
 * Returns:
 * - 400 if required identifiers are missing
 * - 404 if the article is not found
 * - 403 if the authenticated user is not the author
 */
export const deleteArticle = asyncHandler(async (req, res) => {
  const articleId = Number(req.params.id);
  const userId = req.user.id;

  if (!articleId || !userId) {
    return res.status(400).json({
      error: "Article ID and User ID are required",
    });
  }

  const [rows] = await pool.execute(
    "SELECT submitted_by FROM articles WHERE id = ?",
    [articleId],
  );
  const articles = rows as Article[];
  const article = articles[0];
  const authorId = Number(article.submitted_by);

  if (!article) {
    return res.status(404).json({
      error: "Article not found",
    });
  }

  if (authorId !== userId) {
    return res.status(403).json({
      error: "Not allowed. Users can only delete their own articles",
    });
  }

  await pool.execute(`DELETE FROM articles WHERE id = ?`, [articleId]);

  res.status(200).json({
    message: "Article deleted successfully",
    id: articleId,
  });
});
