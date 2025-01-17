import { afterAll, beforeAll, describe, it, expect, beforeEach } from 'vitest';
import { connectDB, disconnectDB } from '@/database';
import supertest from 'supertest';
import createApp from '@/app';
import User from '@/models/User';
import { hashPassword } from '@/utils/auth';

const app = createApp();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('POST /users/signup', () => {
  it('should signup a user successfully', async () => {
    const response = await supertest(app)
      .post('/users/signup')
      .send({
        name: 'Test User',
        email: 'test@test.com',
        password: 'Password1!',
      })
      .expect(201);

    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 for existing email', async () => {
    const response = await supertest(app)
      .post('/users/signup')
      .send({
        name: 'Test User',
        email: 'test@test.com',
        password: 'Password1!',
      })
      .expect(400);

    expect(response.body).toBe(
      'Email is already in use. Please use a different email.'
    );
  });
});

describe('POST /users/login', () => {
  it('should login a user successfully', async () => {
    const hashedPassword = await hashPassword('Password1!');

    await User.create({
      name: 'Test User',
      email: 'test1@test.com',
      password: hashedPassword,
    });

    const response = await supertest(app)
      .post('/users/login')
      .send({
        email: 'test1@test.com',
        password: 'Password1!',
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });
});
