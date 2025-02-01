import { ListDto } from './index';

export class BoardDto {
  id: string;
  title: string;
  lists: ListDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    lists: ListDto[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.lists = lists;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
