import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

export default function createSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
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

  return io;
}
