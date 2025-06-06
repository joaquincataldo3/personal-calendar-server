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

export const getUserEvents = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        const events = await prisma.event.findMany({
            where: { user_id: userId },
            orderBy: { event_date: 'asc' },
        });

        res.status(200).json({
            statusCode: 200,
            message: 'successfully retrieved events',
            data: events,
        });
        return;
    } catch (error) {
        console.log('error getting user events');
        console.log(error)
        res.status(500).json({
            statusCode: 500,
            message: 'internal server error'
        })
        return;
    }
}

export const editEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { eventId } = req.params;
        const { title, description, eventDate } = req.body;

        if (!title || !eventDate) {
            res.status(400).json({
                statusCode: 400,
                message: 'title and event date are required',
            });
            return
        }

        // check to avoid past dates
        if(!isFutureDate(eventDate)){
            res.status(400).json({
                statusCode: 400,
                message: 'event date must be a valid date starting from tomorrow',
            });
            return;
        }

        const event = await prisma.event.findUnique({
            where: { id: Number(eventId) },
        });
        if (!event) {
            res.status(404).json({
                statusCode: 404,
                message: 'event not found or unauthorized to edit',
            });
            return;
        }
        if(event.user_id !== userId) {
            res.status(401).json({
                statusCode: 404,
                message: 'unauthorized to edit event',
            });
            return;
        }

        await prisma.event.update({
            where: { id: Number(eventId) },
            data: {
                title,
                description,
                event_date: new Date(eventDate),
            },
        });

        res.status(200).json({
            statusCode: 200,
            message: 'event updated successfully'
        });
        return;
    } catch (error) {
        console.log('error editing event');
        console.log(error);
        res.status(500).json({
            message: 'internal server error',
            statusCode: 500
        })
        return;
    }
}