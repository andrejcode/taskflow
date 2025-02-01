export class TaskDto {
  id: string;
  title: string;
  body: string;
  dueDate: Date;
  assignedUsers: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    body: string,
    dueDate: Date,
    assignedUsers: string[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.dueDate = dueDate;
    this.assignedUsers = assignedUsers;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
