export class UserMessageDto {
  id: string;
  userId: string;
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
    this.userId = userId;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class UserRoleDto {
  userId: string;
  role: string;
  constructor(userId: string, role: string) {
    this.userId = userId;
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
