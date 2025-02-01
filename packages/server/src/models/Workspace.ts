import { model, Schema, Types } from 'mongoose';
import { IUserRole, userRoleSchema } from './User';
import { boardSchema, IBoard } from './Board';
import { ITextChannel, textChannelSchema } from './TextChannel';

export interface IWorkspace {
  _id: Types.ObjectId;
  name: string;
  users: IUserRole[];
  boards: IBoard[];
  textChannels: ITextChannel[];
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    users: [userRoleSchema],
    boards: [boardSchema],
    textChannels: [textChannelSchema],
  },
  { timestamps: true }
);

export default model('Workspace', workspaceSchema);
