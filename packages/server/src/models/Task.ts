import { Schema, model, Types } from 'mongoose';

export interface ITask {
  _id: Types.ObjectId;
  list: Types.ObjectId;
  title: string;
  body: string;
  dueDate: Date;
  assignedUsers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export const taskSchema = new Schema<ITask>(
  {
    list: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    title: { type: String, required: true },
    body: { type: String },
    dueDate: { type: Date },
    assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model<ITask>('Task', taskSchema);
