import { Router } from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import {
  getWorkspacesSummaryByUser,
  createWorkspace,
  deleteWorkspace,
  getWorkspacesById,
} from '@/controllers/workspaceController';

const workspaceRouter = Router();

workspaceRouter.get('/', authenticateToken, getWorkspacesSummaryByUser);
workspaceRouter.post('/', authenticateToken, createWorkspace);

workspaceRouter.get('/:workspaceId', authenticateToken, getWorkspacesById);
workspaceRouter.delete('/:workspaceId', authenticateToken, deleteWorkspace);

export default workspaceRouter;
