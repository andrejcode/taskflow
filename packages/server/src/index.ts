import { createServer } from 'http';
import config from './config';
import { connectDB, disconnectDB } from './database';
import createApp from './app';
import createSocket from './socket';

const app = createApp();
const server = createServer(app);
createSocket(server);

await connectDB();

const serverInstance = server.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

process.on('SIGINT', async () => {
  await disconnectDB();
  serverInstance.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
