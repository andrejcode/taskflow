import { model, Schema } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
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

export interface IUserRole {
  user: string;
  role: 'admin' | 'editor' | 'viewer';
}

export const userRoleSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], required: true },
  },
  { _id: false }
);

export interface IUserMessage {
  _id: string;
  user: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userMessageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;
