import { Router } from 'express';
import { createEvent } from '../controllers/events.controller';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/', authenticateToken, createEvent);

export default router;