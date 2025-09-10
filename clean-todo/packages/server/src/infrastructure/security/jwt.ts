import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

export interface JwtPayload { sub: string; email: string; name: string }

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
