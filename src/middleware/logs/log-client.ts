import { Request, Response, NextFunction } from "express";

export const logClientHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // access headers
  const userAgent = req.headers["user-agent"];
  const authorization = req.headers.authorization;
  const contentType = req.headers["content-type"];

  console.log("User Agent:", userAgent);
  console.log("Authorization:", authorization);
  console.log("contentType:", contentType);

  next();
};
