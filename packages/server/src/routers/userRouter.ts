import { Router } from 'express';
import { getUser, loginUser, signupUser } from '@/controllers/userController';
import { authenticateToken } from '@/middlewares/authMiddleware';

const userRouter = Router();

userRouter.get('/', authenticateToken, getUser);
userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);

export default userRouter;
