import { ResultSetHeader } from "mysql2";
import { pool } from "../../config/database.js";
import bcrypt from "bcrypt";
import type { User } from "../../models/user.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { sendUserResponse } from "../../utils/send-user-response.js";

export const registerUser = asyncHandler(async (req, res) => {
  const created_at = new Date();
  const { email = null, password = null } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  let [rows] = await pool.execute("SELECT email FROM users WHERE email = ?", [
    email,
  ]);

  const existingUsers = rows as User[];
  if (existingUsers.length > 0) {
    return res.status(409).json({
      error: "User with this email already exists",
    });
  }

  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const [result]: [ResultSetHeader, any] = await pool.execute(
    `INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)`,
    [email, password_hash, created_at],
  );

  [rows] = await pool.execute("SELECT id, email FROM users WHERE id = ?", [
    result.insertId,
  ]);
  const updatedUser = (rows as User[])[0];

  sendUserResponse(
    res,
    updatedUser,
    "User registered successfully",
    undefined,
    201,
  );
});
