import createApp from '@/app';
import { connectDB, disconnectDB } from '@/database';
import Channel from '@/models/Channel';
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

describe('POST /workspaces/:workspaceId/channels', () => {
  it('should return 400 for invalid workspace ID', async () => {
    const response = await supertest(app)
      .post('/workspaces/invalid-id/channels')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(response.text).toBe('Invalid workspace ID.');
  });

  it('should return 404 for authorized user when there are no workspaces', async () => {
    const newWorkspaceId = new Types.ObjectId().toString();
    const response = await supertest(app)
      .post(`/workspaces/${newWorkspaceId}/channels`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(response.text).toBe('Workspace not found.');
  });

  it('should return 403 for user without user role', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: userId, role: 'viewer' }],
    });

    const response = await supertest(app)
      .post(`/workspaces/${workspace._id.toString()}/channels`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    expect(response.text).toBe('You do not have permission to create channel.');
  });

  it('should return 400 for invalid payload', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: userId, role: 'admin' }],
    });

    const response = await supertest(app)
      .post(`/workspaces/${workspace._id.toString()}/channels`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'a' }) // Too short name
      .expect(400);

    expect(response.text).toBe('Invalid payload.');
  });

  it('should create channel for authorized user', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: userId, role: 'admin' }],
    });

    const response = await supertest(app)
      .post(`/workspaces/${workspace._id.toString()}/channels`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Channel' })
      .expect(201);

    expect(response.body.name).toBe('Test Channel');
  });
});

describe('DELETE /workspaces/:workspaceId/channels/:channelId', () => {
  it('should return 400 for invalid channel ID', async () => {
    const newWorkspaceId = new Types.ObjectId().toString();
    const response = await supertest(app)
      .delete(`/workspaces/${newWorkspaceId}/channels/invalid-id`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(response.text).toBe('Invalid channel ID.');
  });

  it('should return 404 for authorized user when channel is not found', async () => {
    const newWorkspaceId = new Types.ObjectId().toString();
    const newChannelId = new Types.ObjectId().toString();
    const response = await supertest(app)
      .delete(`/workspaces/${newWorkspaceId}/channels/${newChannelId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(response.text).toBe('Channel not found.');
  });

  it('should return 403 for user without user role', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: userId, role: 'viewer' }],
    });

    const channel = await Channel.create({
      workspace: workspace._id,
      name: 'Test Channel',
      messages: [],
    });

    const response = await supertest(app)
      .delete(
        `/workspaces/${workspace._id.toString()}/channels/${channel._id.toString()}`
      )
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    expect(response.text).toBe('You do not have permission to delete channel.');
  });

  it('should delete channel for authorized user', async () => {
    const workspace = await Workspace.create({
      name: 'Test Workspace',
      members: [{ user: userId, role: 'admin' }],
    });

    const channel = await Channel.create({
      workspace: workspace._id,
      name: 'Test Channel',
      messages: [],
    });

    await supertest(app)
      .delete(
        `/workspaces/${workspace._id.toString()}/channels/${channel._id.toString()}`
      )
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const deletedChannel = await Channel.findById(channel._id);
    expect(deletedChannel).toBeNull();
  });
});
