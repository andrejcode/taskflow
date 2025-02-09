import { Router } from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import {
  getWorkspacesByUser,
  createWorkspace,
  deleteWorkspace,
  getWorkspaceById,
} from '@/controllers/workspaceController';

const workspaceRouter = Router();

workspaceRouter.get('/', authenticateToken, getWorkspacesByUser);
workspaceRouter.post('/', authenticateToken, createWorkspace);

workspaceRouter.get('/:workspaceId', authenticateToken, getWorkspaceById);
workspaceRouter.delete('/:workspaceId', authenticateToken, deleteWorkspace);

export default workspaceRouter;
