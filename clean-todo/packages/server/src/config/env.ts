import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT || 4000),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/clean_todo',
  JWT_SECRET: process.env.JWT_SECRET || 'devsecret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ? Number(process.env.JWT_EXPIRES_IN) : "1h",
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
} as const;
