import { IBoard } from '@/models/Board';
import { IList } from '@/models/List';
import { ITextChannel } from '@/models/TextChannel';
import { IWorkspace } from '@/models/Workspace';
import {
  BoardDto,
  ListDto,
  TaskDto,
  TextChannelDto,
  UserMessageDto,
  UserRoleDto,
  WorkspaceDto,
  WorkspaceSummaryDto,
} from '@/shared/dtos';

export function mapWorkspaceSummaryToDto(workspace: IWorkspace) {
  return new WorkspaceSummaryDto(
    workspace._id.toString(),
    workspace.name,
    workspace.createdAt,
    workspace.updatedAt
  );
}

export function mapWorkspaceToDto(workspace: IWorkspace) {
  return new WorkspaceDto(
    workspace._id.toString(),
    workspace.name,
    workspace.users.map(
      (user) => new UserRoleDto(user.userId.toString(), user.role)
    ),
    workspace.boards.map((board) => mapBoardToDto(board)),
    workspace.textChannels.map((channel) => mapTextChannelToDto(channel)),
    workspace.createdAt,
    workspace.updatedAt
  );
}

export function mapBoardToDto(board: IBoard) {
  return new BoardDto(
    board._id.toString(),
    board.title,
    board.lists.map((list) => mapListToDto(list)),
    board.createdAt,
    board.updatedAt
  );
}

export function mapTextChannelToDto(channel: ITextChannel) {
  return new TextChannelDto(
    channel._id.toString(),
    channel.name,
    channel.messages.map(
      (message) =>
        new UserMessageDto(
          message._id.toString(),
          message.userId.toString(),
          message.text,
          message.createdAt,
          message.updatedAt
        )
    ),
    channel.createdAt,
    channel.updatedAt
  );
}

export function mapListToDto(list: IList) {
  return new ListDto(
    list._id.toString(),
    list.title,
    list.tasks.map(
      (task) =>
        new TaskDto(
          task._id.toString(),
          task.title,
          task.body,
          task.dueDate,
          task.assignedUsers,
          task.createdAt,
          task.updatedAt
        )
    ),
    list.createdAt,
    list.updatedAt
  );
}
