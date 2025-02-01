import { UserMessageDto } from './UserDtos';

export class TextChannelDto {
  id: string;
  name: string;
  messages: UserMessageDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    messages: UserMessageDto[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
