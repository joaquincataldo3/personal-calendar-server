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
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // format: Bearer <token>

  if (!token) {
    res.status(401).json({
      statusCode: 401,
      message: 'access token required',
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(403).json({
        statusCode: 403,
        message: 'invalid or expired token',
      });
      return 
    }

    req.user = decoded;
    next();
  });
};