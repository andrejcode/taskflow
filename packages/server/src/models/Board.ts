import { Schema, Types } from 'mongoose';
import { IList, listSchema } from './List';

export interface IBoard {
  _id: Types.ObjectId;
  title: string;
  lists: IList[];
  createdAt: Date;
  updatedAt: Date;
}

export const boardSchema = new Schema<IBoard>(
  {
    title: { type: String, required: true },
    lists: { type: [listSchema], default: [] },
  },
  { timestamps: true }
);
