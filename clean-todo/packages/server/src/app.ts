import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { buildRouter } from './interfaces/http/routes.js';
import { errorHandler } from './interfaces/http/middlewares/errorHandler.js';
import { env } from './config/env.js';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: false }));
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api', buildRouter());

  app.use(errorHandler);
  return app;
}
