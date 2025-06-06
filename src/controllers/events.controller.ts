import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authenticateToken';
import { PrismaClient } from '../generated/prisma';
import { isFutureDate } from '../utils/utils';
const prisma = new PrismaClient();

export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, eventDate } = req.body;
    if (!title || !eventDate) {
      res.status(400).json({
        statusCode: 400,
        message: 'title and event date are required',
      });
      return;
    }

    // check to avoid past dates
    if(!isFutureDate(eventDate)){
      res.status(400).json({
        statusCode: 400,
        message: 'event date must be a valid date starting from tomorrow',
      });
      return;
    }

    const userId =  req.user.userId
    const event = await prisma.event.create({
      data: {
        title,
        description,
        event_date: new Date(eventDate),
        user_id: userId,
      },
    });

    res.status(201).json({
      statusCode: 201,
      message: 'successfully created event',
      data: event,
    });
    return;
  } catch (error) {
    console.log('error creating event:');
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      message: 'internal server error',
    });
    return;
  }
};