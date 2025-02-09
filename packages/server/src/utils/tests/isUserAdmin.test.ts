import { describe, expect, it } from 'vitest';
import isUserAdmin from '../isUserAdmin';
import { IWorkspace } from '@/models/Workspace';
import { Types } from 'mongoose';

describe('isUserAdmin', () => {
  const userOneId = new Types.ObjectId();
  const userTwoId = new Types.ObjectId();

  const workspace: IWorkspace = {
    _id: new Types.ObjectId(),
    name: 'Workspace',
    members: [
      { user: userOneId, role: 'admin' },
      { user: userTwoId, role: 'viewer' },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should return true if the user is an admin', () => {
    expect(isUserAdmin(workspace, userOneId.toString())).toBe(true);
  });

  it('should return false if the user is not an admin', () => {
    expect(isUserAdmin(workspace, userTwoId.toString())).toBe(false);
  });
});
