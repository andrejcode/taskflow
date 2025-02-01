import { TaskDto } from './index';

export class ListDto {
  id: string;
  title: string;
  tasks: TaskDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    tasks: TaskDto[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
