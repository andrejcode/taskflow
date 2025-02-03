export class UserMessageDto {
  id: string;
  user: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    text: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.user = userId;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class UserRoleDto {
  user: string;
  role: string;
  constructor(userId: string, role: string) {
    this.user = userId;
    this.role = role;
  }
}

export class UserDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class UserRoleDtoPopulated {
  user: UserDto;
  role: string;

  constructor(user: UserDto, role: string) {
    this.user = user;
    this.role = role;
  }
}
