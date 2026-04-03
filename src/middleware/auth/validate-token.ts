import { pool } from "../../config/database.js";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./verify-token.js";
import { userTokenSchema } from "./schemas/user.js";
import type { User } from "../../models/user.js";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Missing authorization header. Token required." });
  }

  const tokenFormatResult = userTokenSchema.safeParse({ token: authHeader });
  if (!tokenFormatResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: tokenFormatResult.error.issues.map((issue) => issue.message),
    });
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(403).json({
      error: "Invalid or expired token",
    });
  }

  const [rows] = await pool.execute(
    "SELECT id, email, created_at FROM users WHERE id = ?",
    [payload.userId],
  );
  const users = rows as User[];
  const user = users[0];

  if (!user) {
    return res.status(401).json({ error: "User no longer exists" });
  }

  req.user = { id: user.id, email: user.email };
  next();
};
