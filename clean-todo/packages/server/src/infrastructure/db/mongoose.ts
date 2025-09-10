import mongoose from 'mongoose';
import { logger } from '../../config/logger.js';
import { env } from '../../config/env.js';

export async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.MONGO_URI);
  logger.info('MongoDB connected');
}
