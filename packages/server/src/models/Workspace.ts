import { model, Schema, Types } from 'mongoose';
import { IUserRole, IUserRolePopulated, userRoleSchema } from './User';
import { boardSchema, IBoard } from './Board';
import { ITextChannel, textChannelSchema } from './TextChannel';

export interface IWorkspace {
  _id: Types.ObjectId;
  name: string;
  users: IUserRole[] | IUserRolePopulated[];
  boards: IBoard[];
  textChannels: ITextChannel[];
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    users: { type: [userRoleSchema], default: [] },
    boards: { type: [boardSchema], default: [] },
    textChannels: { type: [textChannelSchema], default: [] },
  },
  { timestamps: true }
);

export default model('Workspace', workspaceSchema);
