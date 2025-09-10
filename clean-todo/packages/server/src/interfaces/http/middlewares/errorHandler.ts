import { NextFunction, Request, Response } from 'express';
import { logger } from '../../../config/logger.js';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
}
