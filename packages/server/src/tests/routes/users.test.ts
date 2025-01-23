import { afterAll, beforeAll, describe, it, expect } from 'vitest';
import { connectDB, disconnectDB } from '@/database';
import supertest from 'supertest';
import createApp from '@/app';
import User from '@/models/User';
import { hashPassword, jwtSign } from '@/utils/auth';
import exp from 'constants';

const app = createApp();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('POST /users/signup', () => {
  it('should return 400 for invalid payload', async () => {
    const response = await supertest(app)
      .post('/users/signup')
      .send({
        name: 'Test User',
        email: 'invalid-email',
        password: 'pass',
        confirmPassword: 'pass',
      })
      .expect(400);

    expect(response.text).toBe('Invalid payload.');
  });

  it('should signup a user successfully', async () => {
    const response = await supertest(app)
      .post('/users/signup')
      .send({
        name: 'Test User',
        email: 'test@test.com',
        password: 'Password1!',
        confirmPassword: 'Password1!',
      })
      .expect(201);

    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('email', 'test@test.com');
  });

  it('should return 400 for existing email', async () => {
    const response = await supertest(app)
      .post('/users/signup')
      .send({
        name: 'Test User',
        email: 'test@test.com',
        password: 'Password1!',
        confirmPassword: 'Password1!',
      })
      .expect(400);

    expect(response.text).toBe(
      'Email is already in use. Please use a different email.'
    );
  });
});

describe('POST /users/login', () => {
  it('should return 400 for invalid payload', async () => {
    const response = await supertest(app)
      .post('/users/login')
      .send({
        email: 'invalid-email',
        password: 'pass',
      })
      .expect(400);

    expect(response.text).toBe('Invalid payload.');
  });

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
    expect(response.body.user).toHaveProperty('email', 'test1@test.com');
  });

  describe('GET /users/profile', () => {
    it('should return 401 for unauthorized user', async () => {
      const response = await supertest(app).get('/users/profile').expect(401);

      expect(response.text).toBe('Unauthorized');
    });

    it('should return user profile for authorized user', async () => {
      const hashedPassword = await hashPassword('Password1!');

      const user = await User.create({
        name: 'Test User',
        email: 'testuser@test.com',
        password: hashedPassword,
      });

      const token = jwtSign(user._id.toString());

      const response = await supertest(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toEqual({
        id: user._id.toString(),
        name: 'Test User',
        email: 'testuser@test.com',
      });
    });

    it('should return 401 for expired token', async () => {
      const hashedPassword = await hashPassword('Password1!');

      const user = await User.create({
        name: 'Test User',
        email: 'testuser2@test.com',
        password: hashedPassword,
      });

      const token = jwtSign(user._id.toString(), '-1h');

      const response = await supertest(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(401);

      expect(response.text).toBe('Token expired.');
    });
  });
});
