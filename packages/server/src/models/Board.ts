import { Schema, model, Types } from 'mongoose';

export interface IBoard {
  _id: Types.ObjectId;
  workspace: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export const boardSchema = new Schema<IBoard>(
  {
    workspace: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IBoard>('Board', boardSchema);
