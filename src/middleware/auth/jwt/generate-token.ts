import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "testToken";

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};
