import { Router } from 'express';
import { createEvent, getUserEvents } from '../controllers/events.controller';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.get('/', authenticateToken, getUserEvents);

router.post('/', authenticateToken, createEvent);

export default router;