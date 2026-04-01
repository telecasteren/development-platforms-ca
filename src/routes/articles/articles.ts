import { Router } from "express";
import { validateToken } from "../../middleware/auth/validate-token.js";
import {
  getAllArticles,
  getArticleById,
  queryArticle,
  postArticle,
  updateArticle,
  deleteArticle,
} from "../../controllers/articlesController.js";

const router = Router();

/**
 * @swagger
 * /articles/search:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Search articles
 *     description: Returns articles filtered by one or more query parameters.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Partial match against article title.
 *       - in: query
 *         name: body
 *         schema:
 *           type: string
 *         description: Partial match against article body.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Partial match against article category.
 *     responses:
 *       200:
 *         description: List of articles matching the provided filters.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get("/search", queryArticle);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Get article by ID
 *     description: Returns a single article by numeric ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Article ID.
 *     responses:
 *       200:
 *         description: Article found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", getArticleById);

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Get all articles
 *     description: Returns all articles.
 *     responses:
 *       200:
 *         description: List of articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/", getAllArticles);

/**
 * @swagger
 * /articles:
 *   post:
 *     tags:
 *       - Articles
 *     summary: Create article
 *     description: Creates a new article for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleCreateRequest'
 *     responses:
 *       201:
 *         description: Article created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleCreateSuccessResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/", validateToken, postArticle);

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     tags:
 *       - Articles
 *     summary: Update article
 *     description: Updates an existing article owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Article ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleUpdateRequest'
 *     responses:
 *       200:
 *         description: Article updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleUpdateSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch("/:id", validateToken, updateArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     tags:
 *       - Articles
 *     summary: Delete article
 *     description: Deletes an existing article owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Article ID.
 *     responses:
 *       200:
 *         description: Article deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleDeleteSuccessResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete("/:id", validateToken, deleteArticle);

export default router;
