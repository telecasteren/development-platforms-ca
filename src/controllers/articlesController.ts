import { ResultSetHeader } from "mysql2";
import { pool } from "../config/database.js";
import { isValidId } from "../utils/validate-id.js";
import { asyncHandler } from "../utils/async-handler.js";
import type { Article } from "../models/article.js";

const getAllArticles = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM articles");
  const articles = rows as Article[];

  if (!articles.length) {
    return res.status(404).json({ error: "No articles found." });
  }

  res.json(articles);
});

const getArticleById = asyncHandler(async (req, res) => {
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

/**
 * Searches articles by title, body, and-or category.
 *
 * Requires at least one supported query parameter. All supplied filters are
 * combined with AND semantics in the generated SQL query.
 *
 * Returns:
 * - 400 if none of the supported query parameters are provided
 */
const queryArticle = asyncHandler(async (req, res) => {
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

/**
 * Creates a new article for the authenticated user.
 *
 * Returns:
 * - 400 if title, body, or category is missing
 * - 401 if no authenticated user is available on the request
 */
const postArticle = asyncHandler(async (req, res) => {
  const { title = null, body = null, category = null } = req.body;
  const submitted_by = req.user.id;
  const created_at = new Date();

  if (!title || !body || !category) {
    return res.status(400).json({
      error: "title, body and category are required",
    });
  }

  if (!submitted_by) {
    return res.status(401).json({
      error: "Authenticated user is required",
    });
  }

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO articles (title, body, category, submitted_by, created_at)
      VALUES (?, ?, ?, ?, ?)`,
    [title, body, category, submitted_by, created_at],
  );

  res.status(201).json({
    message: "Article created successfully",
    articleId: result.insertId,
  });
});

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
const updateArticle = asyncHandler(async (req, res) => {
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

  await pool.execute(
    `UPDATE articles SET title = ?, body = ?, category = ? WHERE id = ?`,
    [title, body, category, articleId],
  );

  res.status(200).json({
    message: "Article updated successfully",
    articleId,
  });
});

/**
 * Deletes an existing article owned by the authenticated user.
 *
 * Returns:
 * - 400 if required identifiers are missing
 * - 404 if the article is not found
 * - 403 if the authenticated user is not the author
 */
const deleteArticle = asyncHandler(async (req, res) => {
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

export {
  getAllArticles,
  getArticleById,
  postArticle,
  updateArticle,
  queryArticle,
  deleteArticle,
};
