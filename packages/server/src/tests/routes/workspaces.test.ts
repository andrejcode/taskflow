import createApp from '@/app';
import { connectDB, disconnectDB } from '@/database';
import User from '@/models/User';
import Workspace from '@/models/Workspace';
import { hashPassword, jwtSign } from '@/utils/auth';
import { Types } from 'mongoose';
import supertest from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const app = createApp();

let token: string;
let userId: string;

beforeAll(async () => {
  await connectDB();

  const hashedPassword = await hashPassword('Password1!');

  const user = await User.create({
    name: 'Test User',
    email: 'testuser@test.com',
    password: hashedPassword,
  });

  userId = user._id.toString();
  token = jwtSign(userId);
});

afterAll(async () => {
  await disconnectDB();
});

describe('GET /workspaces', () => {
  it('should return 401 for unauthorized user', async () => {
    const response = await supertest(app).get('/workspaces').expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  it('should return 404 for authorized user when there are no workspaces', async () => {
    const response = await supertest(app)
      .get('/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(response.text).toBe('No workspaces found.');
  });

  it('should return workspaces for authorized user', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: userId, role: 'admin' }],
    });

    const response = await supertest(app)
      .get('/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body[0]).toMatchObject({
      id: workspace._id.toString(),
      name: 'Test Workspace',
      createdAt: workspace.createdAt.toISOString(),
      updatedAt: workspace.updatedAt.toISOString(),
    });
  });
});

describe('POST /workspaces', () => {
  it('should return 401 for unauthorized user', async () => {
    const response = await supertest(app).post('/workspaces').expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  it('should return 400 for invalid workspace name', async () => {
    const response = await supertest(app)
      .post('/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'W' }) // Name is too short
      .expect(400);

    expect(response.text).toBe('Invalid payload.');
  });

  it('should create a workspace for authorized user', async () => {
    const response = await supertest(app)
      .post('/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Workspace' })
      .expect(201);

    expect(response.body.name).toBe('Test Workspace');
  });
});

describe('GET /workspaces/:workspaceId', () => {
  it('should return 401 for unauthorized user', async () => {
    const response = await supertest(app).get('/workspaces/123').expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  it('should return 400 for invalid workspace ID', async () => {
    const response = await supertest(app)
      .get('/workspaces/invalid-id')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(response.text).toBe('Invalid workspace ID.');
  });

  it('should return 404 for authorized user when workspace is not found', async () => {
    const newWorkspaceId = new Types.ObjectId().toString();

    const response = await supertest(app)
      .get(`/workspaces/${newWorkspaceId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(response.text).toBe('Workspace not found.');
  });

  it('should return 403 for authorized user without access to workspace', async () => {
    const newUserId = new Types.ObjectId().toString();
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: newUserId, role: 'admin' }],
    });

    const response = await supertest(app)
      .get(`/workspaces/${workspace._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    expect(response.text).toBe(
      'You do not have permission to access this workspace.'
    );
  });

  it('should return workspace for authorized user', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [
        {
          user: userId,
          role: 'admin',
        },
      ],
    });

    const response = await supertest(app)
      .get(`/workspaces/${workspace._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: workspace._id.toString(),
      name: 'Test Workspace',
      createdAt: workspace.createdAt.toISOString(),
      updatedAt: workspace.updatedAt.toISOString(),
    });
  });
});

describe('DELETE /workspaces/:workspaceId', () => {
  it('should return 401 for unauthorized user', async () => {
    const response = await supertest(app).delete('/workspaces/123').expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  it('should return 400 for invalid workspace ID', async () => {
    const response = await supertest(app)
      .delete('/workspaces/invalid-id')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(response.text).toBe('Invalid workspace ID.');
  });

  it('should return 404 for authorized user when workspace is not found', async () => {
    const newWorkspaceId = new Types.ObjectId().toString();
    const response = await supertest(app)
      .delete(`/workspaces/${newWorkspaceId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(response.text).toBe('Workspace not found.');
  });

  it('should return 403 for authorized user without access to workspace', async () => {
    const newUserId = new Types.ObjectId().toString();
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: newUserId, role: 'admin' }],
    });

    const response = await supertest(app)
      .delete(`/workspaces/${workspace._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    expect(response.text).toBe(
      'You do not have permission to delete this workspace.'
    );
  });

  it('should return 403 for authorized user without admin role', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: userId, role: 'viewer' }],
    });

    const response = await supertest(app)
      .delete(`/workspaces/${workspace._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    expect(response.text).toBe(
      'You do not have permission to delete this workspace.'
    );
  });

  it('should delete workspace for authorized user', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: userId, role: 'admin' }],
    });

    await supertest(app)
      .delete(`/workspaces/${workspace._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const deletedWorkspace = await Workspace.findById(workspace._id);
    expect(deletedWorkspace).toBeNull();
  });
});
