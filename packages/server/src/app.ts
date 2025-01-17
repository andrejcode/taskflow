import express, { type Request, type Response } from 'express';
import userRouter from './routers/userRouter';
import cors from 'cors';

export default function createApp() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    })
  );
  app.use(express.json());

  app.use('/health', (_req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello TaskFlow');
  });

  app.use('/users', userRouter);

  app.all('*', (_req: Request, res: Response) => {
    res.sendStatus(404);
  });

  return app;
}
