import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { getSettingsConstants, getUserSettings, updateUserSettings } from '../controllers/settings.controller';

const router = Router();

router.get('/', authenticateToken, getUserSettings);

router.get('/settings-constants', authenticateToken, getSettingsConstants)

router.put('/', authenticateToken, updateUserSettings);

export default router;