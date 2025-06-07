import { Response } from 'express';

export const sendOk = (res: Response, message: string, data?: any) => {
  res.status(200).json({
    statusCode: 200,
    message,
    ...(data !== undefined && { data }),
  });
};

export const sendCreated = (res: Response, message: string, data?: any) => {
  res.status(201).json({
    statusCode: 201,
    message,
    ...(data !== undefined && { data }),
  });
};

export const sendBadRequest = (res: Response, message = 'bad request') => {
  res.status(400).json({
    statusCode: 400,
    message,
  });
};

export const sendUnauthorized = (res: Response, message = 'unauthorized') => {
  res.status(401).json({
    statusCode: 401,
    message,
  });
};

export const sendNotFound = (res: Response, message = 'resource not found') => {
  res.status(404).json({
    statusCode: 404,
    message,
  });
};

export const sendServerError = (res: Response) => {
  res.status(500).json({
    statusCode: 500,
    message: 'internal server error',
  });
};