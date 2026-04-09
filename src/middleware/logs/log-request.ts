import { Request, Response, NextFunction } from "express";

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `REQUEST: Method: "${req.method}", URL: "${req.url}", Body: "${JSON.stringify(req.body)}"`,
  );
  next();
};
