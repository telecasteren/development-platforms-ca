import { pool } from "../../config/database.js";
import bcrypt from "bcrypt";
import type { User, UserResponse } from "../../models/user.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { generateToken } from "../../middleware/auth/jwt/generate-token.js";
import { sendUserResponse } from "../../utils/send-user-response.js";

export const loginUser = asyncHandler(async (req, res) => {
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
