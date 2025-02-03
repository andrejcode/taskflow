import { model, Schema, Types } from 'mongoose';

export interface IUserRole {
  user: Types.ObjectId;
  role: 'admin' | 'editor' | 'viewer';
}

export const userRoleSchema = new Schema<IUserRole>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], required: true },
  },
  { _id: false, timestamps: false }
);

export interface IUserMessage {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userMessageSchema = new Schema<IUserMessage>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRolePopulated {
  user: IUser;
  role: 'admin' | 'editor' | 'viewer';
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;
