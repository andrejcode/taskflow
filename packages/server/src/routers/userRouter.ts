import { Router } from 'express';
import {
  getUserProfile,
  loginUser,
  signupUser,
} from '@/controllers/userController';
import { authenticateToken } from '@/middlewares/authMiddleware';

const userRouter = Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authenticateToken, getUserProfile);

export default userRouter;
