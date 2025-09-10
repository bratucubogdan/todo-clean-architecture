import { createApp } from './app.js';
import { connectDB } from './infrastructure/db/mongoose.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

(async () => {
  await connectDB();
  const app = createApp();
  app.listen(env.PORT, () => logger.info(`Server listening on http://localhost:${env.PORT}`));
})();
