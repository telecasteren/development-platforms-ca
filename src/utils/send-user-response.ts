import type { Response } from "express";
import type { UserResponse } from "../models/user.js";

export const sendUserResponse = (
  res: Response,
  user: UserResponse,
  message: string,
  token?: string,
  status: number = 200,
) => {
  res.status(status).json({
    message,
    user,
    token,
  });
};
