import { Router } from 'express';
import { logout, registerUser, signIn, userAuthenticated } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.get('/logout', logout);
router.get('/check-user-logged', authenticateToken, userAuthenticated)

router.post('/register', registerUser);
router.post('/sign-in', signIn);

export default router;