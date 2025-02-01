import { Schema, Types } from 'mongoose';

export interface ITask {
  _id: Types.ObjectId;
  title: string;
  body: string;
  dueDate: Date;
  assignedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    body: { type: String },
    dueDate: { type: Date },
    assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);
