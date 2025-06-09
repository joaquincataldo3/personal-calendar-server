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
    console.log('entro')
    res.status(401).json({
      statusCode: 401,
      message: 'access token required',
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({
        statusCode: 403,
        message: 'invalid or expired token',
      });
      return;
    }

    req.user = decoded;
    next();
  });
};