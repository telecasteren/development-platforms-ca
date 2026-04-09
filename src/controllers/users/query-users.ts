import { pool } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { User } from "../../models/user.js";

/**
 * Searches users by email using a case-insensitive exact match.
 *
 * Returns 400 if the `email` query parameter is missing.
 */
export const queryUsers = asyncHandler(async (req, res) => {
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
