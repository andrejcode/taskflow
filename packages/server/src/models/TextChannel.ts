import { Schema, Types } from 'mongoose';
import { IUserMessage, userMessageSchema } from './User';

export interface ITextChannel {
  _id: Types.ObjectId;
  name: string;
  messages: IUserMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export const textChannelSchema = new Schema<ITextChannel>(
  {
    name: { type: String, required: true },
    messages: [userMessageSchema],
  },
  { timestamps: true }
);
