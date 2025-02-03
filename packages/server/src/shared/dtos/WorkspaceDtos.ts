import {
  BoardDto,
  UserRoleDtoPopulated,
  TextChannelDto,
  UserRoleDto,
} from './index';

export class WorkspaceSummaryDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, name: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WorkspaceDto {
  id: string;
  name: string;
  users: UserRoleDto[] | UserRoleDtoPopulated[];
  boards: BoardDto[];
  textChannels: TextChannelDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    users: UserRoleDto[] | UserRoleDtoPopulated[],
    boards: BoardDto[],
    textChannels: TextChannelDto[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.boards = boards;
    this.textChannels = textChannels;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
