import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY!;

type CustomRequest = {
  token: string | JwtPayload;
} & Request;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Token is required',
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: 'error',
        message: 'Token has expired',
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token',
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred during authentication',
      });
    }
  }
};
