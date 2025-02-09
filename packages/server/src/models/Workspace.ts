import { model, Schema, Types } from 'mongoose';

export interface IMember {
  user: Types.ObjectId;
  role: 'admin' | 'editor' | 'viewer';
}

export const memberSchema = new Schema<IMember>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], required: true },
  },
  { _id: false, timestamps: false }
);

export interface IWorkspace {
  _id: Types.ObjectId;
  name: string;
  members: IMember[];
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    members: { type: [memberSchema], required: true },
  },
  { timestamps: true }
);

export default model<IWorkspace>('Workspace', workspaceSchema);
