import { Request, Response, NextFunction } from "express";
import {
  userIdSchema,
  partialUserDataSchema,
  requiredUserDataSchema,
} from "../schemas/user.js";

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = userIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues.map((issue) => issue.message),
    });
  }
  next();
};

export const validateRequiredUserData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = requiredUserDataSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  next();
};

export const validatePartialUserData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = partialUserDataSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  next();
};
