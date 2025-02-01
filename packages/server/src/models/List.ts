import { Schema, Types } from 'mongoose';
import { ITask, taskSchema } from './Task';

export interface IList {
  _id: Types.ObjectId;
  title: string;
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
}

export const listSchema = new Schema<IList>(
  {
    title: { type: String, required: true },
    tasks: [taskSchema],
  },
  { timestamps: true }
);
