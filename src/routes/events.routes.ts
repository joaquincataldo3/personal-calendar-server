import { Router } from 'express';
import { createEvent, deleteEvent, editEvent, getUserEvents } from '../controllers/events.controller';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.get('/', authenticateToken, getUserEvents);

router.post('/', authenticateToken, createEvent);

router.put('/:eventId', authenticateToken, editEvent);

router.delete('/:eventId', authenticateToken, deleteEvent);

export default router;