import { Router } from 'express';
import { logout, registerUser, signIn } from '../controllers/auth.controller';

const router = Router();

router.get('/logout', logout);

router.post('/register', registerUser);
router.post('/sign-in', signIn);

export default router;