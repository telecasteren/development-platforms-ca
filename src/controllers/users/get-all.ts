import { pool } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { User } from "../../models/user.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute("SELECT id, email, created_at FROM users");
  const users = rows as User[];
  res.json(users);
});
