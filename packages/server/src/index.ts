import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import config from './config';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  })
);
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use('/health', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello TaskFlow');
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('message', (data) => {
    console.log('Message received:', data);

    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
