import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authenticateToken';
import { PrismaClient } from '../generated/prisma';
import { isFutureDate } from '../utils/utils';
import { sendBadRequest, sendNotFound, sendOk, sendServerError, sendUnauthorized } from '../utils/sendResponses';
const prisma = new PrismaClient();

export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, startTime, endTime } = req.body;

    if (!title || !startTime || !endTime) {
      sendBadRequest(res, 'title and event dates are required');
      return;
    }
   
    // check to avoid past dates
    if(!isFutureDate(startTime) || !isFutureDate(endTime)){
        sendBadRequest(res, 'event dates must be a valid date starting from today')
        return;
    }
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    // time format validations
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      sendBadRequest(res, 'invalid date format');
      return;
    }

    if (start >= end) {
      sendBadRequest(res, 'start time must be before end time');
      return;
    }

    const userId =  req.user.userId
    const event = await prisma.event.create({
      data: {
        title,
        description,
        start_time: start,
        end_time: end,
        user_id: userId,
      },
    });

    sendOk(res, 'successfully created event', event);
    return;
  } catch (error) {
    console.log('error creating event:');
    console.log(error);
    sendServerError(res);
    return;
  }
};

export const getUserEvents = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        const events = await prisma.event.findMany({
            where: { user_id: userId },
            orderBy: { start_time: 'asc' },
        });

        sendOk(res, 'successfully retrieved events', events);
        return;
    } catch (error) {
        console.log('error getting user events');
        console.log(error);
        sendServerError(res);
        return;
    }
}

export const editEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const eventIdStr = req.params.eventId; 
        const eventId = Number(eventIdStr);
        const { title, description, startTime, endTime } = req.body;
        // asumming we are handling UTC dates
        
        if (isNaN(eventId)) {
            sendBadRequest(res, 'invalid event id');
            return;
        }
        
        if (!title || !startTime || !endTime) {
            sendBadRequest(res, 'title and event date are required');
            return;
        }

        // check to avoid past dates
        if(!isFutureDate(startTime) || !isFutureDate(endTime)){
            sendBadRequest(res, 'event dates must be a valid date starting from today')
            return;
        }
        
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            sendBadRequest(res, 'invalid date format');
            return;
        }

        if (start >= end) {
            sendBadRequest(res, 'start time must be before end time');
            return;
        }

        const event = await prisma.event.findUnique({
            where: { id: Number(eventId) },
        });
        if (!event) {
            sendNotFound(res, 'event not found');
            return;
        }
        if(event.user_id !== userId) {
            sendUnauthorized(res, 'unauthorized to edit event')
            return;
        }

        await prisma.event.update({
            where: { id: Number(eventId) },
            data: {
                title,
                description,
                start_time: start,
                end_time: end
            },
        });

        sendOk(res, 'event updated successfully')
        return;
    } catch (error) {
        console.log('error editing event');
        console.log(error);
        sendServerError(res);
        return;
    }
}

export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const eventIdStr = req.params.eventId; 
        const eventId = Number(eventIdStr); 

        if (isNaN(eventId)) {
            sendBadRequest(res, 'invalid event id');
            return;
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event) {
            sendNotFound(res, 'event not found');
            return;
        }
        if(event.user_id !== userId){
            sendUnauthorized(res, 'unauthorized to delete event');
            return;
        }

        await prisma.event.delete({
            where: { id: eventId },
        });

        sendOk(res, 'event successfully deleted');
        return;

    } catch (error) {
        console.log('error deleting event');
        console.log(error);
        sendServerError(res);
        return;
    }
 
}