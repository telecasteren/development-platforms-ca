import { pool } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { Article } from "../../models/article.js";

export const getAllArticles = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM articles");
  const articles = rows as Article[];

  if (!articles.length) {
    return res.status(404).json({ error: "No articles found." });
  }

  res.json(articles);
});
