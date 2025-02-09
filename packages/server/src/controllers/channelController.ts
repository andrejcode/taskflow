import { z } from 'zod';
import type { Request, Response } from 'express';
import TextChannel from '@/models/Channel';
import Workspace from '@/models/Workspace';
import { nameSchema } from '@/shared/schemas';
import { isValidObjectId } from '@/utils/mongo';
import isUserAdmin from '@/utils/isUserAdmin';
import { mapChannelToDto } from '@/services/channelService';

export async function createChannel(req: Request, res: Response) {
  const { userId } = req;
  const { workspaceId } = req.params;

  try {
    if (!isValidObjectId(workspaceId)) {
      res.status(400).send('Invalid workspace ID.');
      return;
    }

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      res.status(404).send('Workspace not found.');
      return;
    }

    if (!isUserAdmin(workspace, userId!)) {
      res.status(403).send('You do not have permission to create channel.');
      return;
    }

    const name = nameSchema.parse(req.body.name);
    const newChannel = await TextChannel.create({
      workspace: workspace._id,
      name,
    });

    const channelDto = mapChannelToDto(newChannel);
    res.status(201).json(channelDto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send('Invalid payload.');
      return;
    }

    res.status(500).send('Internal server error.');
  }
}

export async function deleteChannel(req: Request, res: Response) {
  const { channelId } = req.params;
  const { userId } = req;

  try {
    if (!isValidObjectId(channelId)) {
      res.status(400).send('Invalid channel ID.');
      return;
    }

    const channel = await TextChannel.findById(channelId);

    if (!channel) {
      res.status(404).send('Channel not found.');
      return;
    }

    const workspace = await Workspace.findById(channel.workspace);

    if (!workspace) {
      res.status(404).send('Workspace not found.');
      return;
    }

    if (!isUserAdmin(workspace, userId!)) {
      res.status(403).send('You do not have permission to delete channel.');
      return;
    }

    await channel.deleteOne();
    res.sendStatus(204);
  } catch {
    res.status(500).send('Internal server error.');
  }
}
