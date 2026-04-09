import { pool } from "../../config/database.js";
import { isValidId } from "../../utils/validate-id.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { Article } from "../../models/article.js";

export const getArticleById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!isValidId(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid article ID" });
  }

  const [rows] = await pool.execute("SELECT * FROM articles WHERE id = ?", [
    id,
  ]);
  const articles = rows as Article[];
  const article = articles[0];

  if (!article) {
    return res.status(404).json({ error: "Article not found." });
  }

  res.json(article);
});
