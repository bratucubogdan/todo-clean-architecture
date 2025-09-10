import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../../../infrastructure/security/jwt.js';

export interface AuthedRequest extends Request { user?: { id: string; email: string; name: string } }

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = header.split(' ')[1];
  try {
    const payload = verifyJwt(token);
    req.user = { id: payload.sub, email: payload.email, name: payload.name } as any;
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
