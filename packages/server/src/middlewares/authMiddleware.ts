import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload, type VerifyErrors } from 'jsonwebtoken';
import config from '@/config';
import { isValidObjectId } from '@/utils/mongo';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
  } else {
    jwt.verify(
      token,
      config.jwtSecret,
      (err: VerifyErrors | null, payload: string | JwtPayload | undefined) => {
        if (payload && typeof payload !== 'string') {
          if (typeof payload.id === 'string' && isValidObjectId(payload.id)) {
            req.userId = payload.id;
          } else {
            return res.sendStatus(401);
          }

          return next();
        } else {
          if (err?.message === 'jwt expired') {
            return res.status(401).send('Token expired.');
          }

          res.sendStatus(401);
        }
      }
    );
  }
}
