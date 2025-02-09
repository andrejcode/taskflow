export class MemberDto {
  user: string;
  role: 'admin' | 'editor' | 'viewer';

  constructor(user: string, role: 'admin' | 'editor' | 'viewer') {
    this.user = user;
    this.role = role;
  }
}

export class WorkspaceDto {
  id: string;
  name: string;
  members: MemberDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    members: MemberDto[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
