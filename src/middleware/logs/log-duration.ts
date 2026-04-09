import { Request, Response, NextFunction } from "express";

export const logDuration = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `DURATION: Method: "${req.method}", URL: "${req.url}" - ${duration}ms`,
    );
  });
  next();
};
