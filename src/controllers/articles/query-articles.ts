import { pool } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { Article } from "../../models/article.js";

/**
 * Searches articles by title, body, and-or category.
 *
 * Requires at least one supported query parameter. All supplied filters are
 * combined with AND semantics in the generated SQL query.
 *
 * Returns:
 * - 400 if none of the supported query parameters are provided
 */
export const queryArticle = asyncHandler(async (req, res) => {
  const { title, body, category } = req.query;

  if (!title && !body && !category) {
    return res.status(400).json({
      error:
        "At least one of title, body and category must be present in the query.",
    });
  }

  const conditions: string[] = [];
  const params: any[] = [];

  if (title) {
    conditions.push("title LIKE ?");
    params.push(`%${title}%`);
  }

  if (body) {
    conditions.push("body LIKE ?");
    params.push(`%${body}%`);
  }

  if (category) {
    conditions.push("category LIKE ?");
    params.push(`%${category}%`);
  }

  const SQL = `SELECT * FROM articles WHERE ${conditions.join(" AND ")}`;
  const [rows] = await pool.execute(SQL, params);
  const articles = rows as Article[];

  res.json(articles);
});
