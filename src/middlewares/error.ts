import { Response, Request, NextFunction } from "express";

// NOT FOUND
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handler
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};
