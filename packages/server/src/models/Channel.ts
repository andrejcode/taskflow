import { model, Schema, Types } from 'mongoose';

export interface IMessage {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export const messageSchema = new Schema<IMessage>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export interface IChannel {
  _id: Types.ObjectId;
  workspace: Types.ObjectId;
  name: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export const channelSchema = new Schema<IChannel>(
  {
    workspace: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    name: { type: String, required: true },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true }
);

export default model<IChannel>('Channel', channelSchema);
