import { z } from 'zod';
import type { Request, Response } from 'express';
import Workspace, { IWorkspace } from '@/models/Workspace';
import {
  mapWorkspaceSummaryToDto,
  mapWorkspaceToDto,
} from '@/services/workspaceService';
import { WorkspaceDto, WorkspaceSummaryDto } from '@/shared/dtos';
import { nameSchema } from '@/shared/schemas';
import { isValidObjectId } from '@/utils/mongo';

export async function getWorkspacesSummaryByUser(req: Request, res: Response) {
  const { userId } = req;

  try {
    const workspaces = await Workspace.find({
      'users.userId': userId,
    }).select('name createdAt updatedAt');

    if (!workspaces || workspaces.length === 0) {
      res.status(404).send('No workspaces found.');
      return;
    }

    const workspacesDto: WorkspaceSummaryDto[] = workspaces.map((workspace) =>
      mapWorkspaceSummaryToDto(workspace)
    );

    res.json(workspacesDto);
  } catch {
    res.status(500).send('Internal server error.');
  }
}

export async function getWorkspacesById(req: Request, res: Response) {
  const { workspaceId } = req.params;
  const { userId } = req;

  try {
    if (!isValidObjectId(workspaceId)) {
      res.status(400).send('Invalid workspace ID.');
      return;
    }

    const workspace: IWorkspace | null = await Workspace.findById(workspaceId);

    if (!workspace) {
      res.status(404).send('Workspace not found.');
      return;
    }

    const user = workspace?.users.find(
      (user) => user.userId.toString() === userId
    );

    if (!user) {
      res
        .status(403)
        .send('You do not have permission to access this workspace.');
      return;
    }

    const workspaceDto: WorkspaceDto = mapWorkspaceToDto(workspace);
    res.json(workspaceDto);
  } catch {
    res.status(500).send('Internal server error.');
  }
}

export async function createWorkspace(req: Request, res: Response) {
  const { userId } = req;

  try {
    const name = nameSchema.parse(req.body.name);

    const workspace = await Workspace.create({
      name,
      users: [{ userId, role: 'admin' }],
    });

    const workspaceDto: WorkspaceDto = mapWorkspaceToDto(workspace);
    res.status(201).json(workspaceDto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send('Invalid payload.');
      return;
    }

    res.status(500).send('Internal server error.');
  }
}

export async function deleteWorkspace(req: Request, res: Response) {
  const { workspaceId } = req.params;
  const { userId } = req;

  try {
    if (!isValidObjectId(workspaceId)) {
      res.status(400).send('Invalid workspace ID.');
      return;
    }

    const workspace = await Workspace.findById(workspaceId).select('users');

    if (!workspace) {
      res.status(404).send('Workspace not found.');
      return;
    }

    // Check if the workspace has the user as an admin
    const user = workspace?.users.find(
      (user) => user.userId.toString() === userId && user.role === 'admin'
    );

    if (!user) {
      res
        .status(403)
        .send('You do not have permission to delete this workspace.');
      return;
    }

    await workspace.deleteOne();
    res.sendStatus(204);
  } catch {
    res.status(500).send('Internal server error.');
  }
}
