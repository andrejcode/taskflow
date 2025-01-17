import supertest from 'supertest';
import { describe, it } from 'vitest';
import createApp from '@/app';

const app = createApp();

describe('route', () => {
  it('/health should return 200', async () => {
    await supertest(app).get('/health').expect(200);
  });

  it('should return 404 when not found', async () => {
    await supertest(app).get('/not-found').expect(404);
  });
});
