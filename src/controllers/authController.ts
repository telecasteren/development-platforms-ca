import { ResultSetHeader } from "mysql2";
import { pool } from "../config/database.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/async-handler.js";
import { generateToken } from "../middleware/auth/generate-token.js";
import { sendUserResponse } from "../utils/send-user-response.js";
import type { User, UserResponse } from "../models/user.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body as {
    email: User["email"];
    password: string;
  };

  if (typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({ error: "Password is required" });
  }

  // find user in db and match password with bcrypt
  const [rows] = await pool.execute(
    "SELECT id, email, password_hash FROM users WHERE email = ?",
    [email],
  );
  const users = rows as User[];
  const user = users[0];

  if (!user) {
    return res
      .status(401)
      .json({ error: "Invalid credentials, user doesn't exist" });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res
      .status(401)
      .json({ error: "Invalid credentials, wrong password" });
  }

  const token = generateToken(user.id);
  const userResponse: UserResponse = {
    id: user.id,
    email: user.email,
  };

  sendUserResponse(res, userResponse, "Login successful", token);
});

const registerUser = asyncHandler(async (req, res) => {
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

export { loginUser, registerUser };
