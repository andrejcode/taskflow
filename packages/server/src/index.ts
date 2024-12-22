import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello TaskFlow');
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('message', (data) => {
    console.log('Message received:', data);

    socket.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
