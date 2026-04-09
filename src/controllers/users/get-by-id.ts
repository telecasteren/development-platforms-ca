import { pool } from "../../config/database.js";
import type { User } from "../../models/user.js";
import { isValidId } from "../../utils/validate-id.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const getUserById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  if (!isValidId(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid article ID" });
  }

  const [rows] = await pool.execute(
    "SELECT id, email, created_at FROM users WHERE id = ?",
    [id],
  );
  const users = rows as User[];
  res.json(users);
});
