import { Schema, model, Types } from 'mongoose';

export interface IList {
  _id: Types.ObjectId;
  board: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export const listSchema = new Schema<IList>(
  {
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IList>('List', listSchema);
