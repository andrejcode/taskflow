import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '@/config';

let mongoMemoryServer: MongoMemoryServer;

export async function connectDB() {
  try {
    let uri: string = config.dbUri;

    if (config.env === 'test') {
      mongoMemoryServer = new MongoMemoryServer();
      uri = mongoMemoryServer.getUri();
      console.log('Using in-memory MongoDB for testing.');
    }

    await mongoose.connect(uri);
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();

    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
      console.log('Stopped the in-memory MongoDB instance.');
    }

    console.log('Disconnected from the database.');
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
  }
}
