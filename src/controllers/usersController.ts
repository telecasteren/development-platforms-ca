import { pool } from "../config/database.js";
import { asyncHandler } from "../utils/async-handler.js";
import { sendUserResponse } from "../utils/send-user-response.js";
import type { User } from "../models/user.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute("SELECT id, email, created_at FROM users");
  const users = rows as User[];
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [rows] = await pool.execute(
    "SELECT id, email, created_at FROM users WHERE id = ?",
    [id],
  );
  const users = rows as User[];
  res.json(users);
});

/**
 * Updates fields on the authenticated user's own account.
 *
 * Only `email` is currently supported.
 * Returns 403 if the path ID does not match `req.user.id`.
 * Returns 400 if no supported fields are provided.
 */
const updateUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);

  if (userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed. Users can only update their own data",
    });
  }

  const fields = [];
  const values = [];

  if (req.body.email) {
    fields.push("email = ?");
    values.push(req.body.email);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  values.push(userId);

  await pool.execute(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );

  const [rows] = await pool.execute(
    "SELECT id, email FROM users WHERE id = ?",
    [userId],
  );
  const users = rows as User[];
  const updatedUser = users[0];

  sendUserResponse(res, updatedUser, "User updated successfully");
});

/**
 * Searches users by email using a case-insensitive exact match.
 *
 * Returns 400 if the `email` query parameter is missing.
 */
const queryUsers = asyncHandler(async (req, res) => {
  const email =
    typeof req.query.email === "string" ? req.query.email : undefined;

  if (email) {
    const [rows] = await pool.execute(
      "SELECT id, email, created_at FROM users WHERE LOWER(email) = LOWER(?)",
      [email],
    );
    const users = rows as User[];
    return res.json(users);
  }
  return res.status(400).json({ error: "Email query parameter is required" });
});

/**
 * Deletes the authenticated user's own account.
 *
 * Returns 400 if the user ID is invalid.
 * Returns 403 if the path ID does not match `req.user.id`.
 */
const deleteUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json({
      error: "User ID is required",
    });
  }

  if (userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed. Users can only delete their own user",
    });
  }

  await pool.execute(`DELETE FROM users WHERE id = ?`, [userId]);

  res.status(200).json({
    message: "User deleted successfully",
    id: userId,
  });
});

export { getAllUsers, getUserById, updateUser, queryUsers, deleteUser };
