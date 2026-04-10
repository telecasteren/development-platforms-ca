import { pool } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { Article } from "../../models/article.js";

/**
 * Updates an existing article owned by the authenticated user.
 *
 * Supported fields:
 * - title
 * - body
 * - category
 *
 * Returns:
 * - 404 if the article does not exist
 * - 403 if the authenticated user is not the author of the article
 */
export const updateArticle = asyncHandler(async (req, res) => {
  const articleId = Number(req.params.id);
  const { title, body, category } = req.body;
  const [rows] = await pool.execute(
    "SELECT submitted_by FROM articles WHERE id = ?",
    [articleId],
  );
  const articles = rows as Article[];
  const article = articles[0];

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }

  if (Number(article.submitted_by) !== Number(req.user.id)) {
    return res.status(403).json({
      error: "Not allowed. Users can only update their own articles",
    });
  }

  const fields = [];
  const values = [];

  // supported PATCH fields
  if (title) {
    fields.push("title = ?");
    values.push(title);
  }

  if (category) {
    fields.push("category = ?");
    values.push(category);
  }

  if (body) {
    fields.push("body = ?");
    values.push(body);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  values.push(articleId);

  await pool.execute(
    `UPDATE articles SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );

  res.status(200).json({
    message: "Article updated successfully",
    articleId,
  });
});
