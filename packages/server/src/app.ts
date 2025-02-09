import express, { type Request, type Response } from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import workspaceRouter from './routers/workspaceRouter';
import boardRouter from './routers/boardRouter';
import channelRouter from './routers/channelRouter';
export default function createApp() {
  const app = express();

  app.use(cors({ origin: 'http://localhost:5173' }));
  app.use(express.json());

  app.use('/health', (_req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use('/users', userRouter);
  app.use('/workspaces', workspaceRouter);
  app.use('/workspaces/:workspaceId/boards', boardRouter);
  app.use('/workspaces/:workspaceId/channels', channelRouter);

  app.all('*', (_req: Request, res: Response) => {
    res.sendStatus(404);
  });

  return app;
}
