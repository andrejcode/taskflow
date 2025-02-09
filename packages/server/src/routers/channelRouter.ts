import { createChannel, deleteChannel } from '@/controllers/channelController';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { Router, type Request, type Response } from 'express';

const channelRouter = Router({ mergeParams: true });

channelRouter.post('/', authenticateToken, createChannel);

// Route for getting all messages from a channel
channelRouter.get('/:channelId', (req: Request, res: Response) => {
  const { userId } = req;
  const { workspaceId, channelId } = req.params;

  // Check if user is a member of the workspace and if user is admin

  // Check if channel exists and is part of the workspace

  // Get all messages from the channel

  // Send the messages
});

// Route for sending messages to a channel
channelRouter.post('/:channelId', (req: Request, res: Response) => {
  const { userId } = req;
  const { workspaceId, channelId } = req.params;
});

channelRouter.delete('/:channelId', authenticateToken, deleteChannel);

export default channelRouter;
