import { Router } from 'express';
import { registerUser, signIn } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/sign-in', signIn);

export default router;