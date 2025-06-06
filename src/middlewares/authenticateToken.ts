import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: any; 
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
 
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: 'access token required',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({
        statusCode: 403,
        message: 'invalid or expired token',
      });
    }

    req.user = decoded;
    next();
  });
};