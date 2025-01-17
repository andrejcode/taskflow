import type { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import { loginSchema, signupSchema } from '@/schemas/userSchemas';
import { hashPassword, jwtSign } from '@/utils/auth';
import { isMongoDBDuplicateKeyError } from '@/utils/mongo';

export async function signupUser(req: Request, res: Response) {
  try {
    const { name, email, password } = signupSchema.parse(req.body);

    const hash = await hashPassword(password);
    const user = await User.create({ name, email, password: hash });

    const token = jwtSign(user._id.toString());
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // TODO: Improve error message
      res.status(400).json(error.errors.map((err) => err.message).join(', '));
      return;
    }

    if (isMongoDBDuplicateKeyError(error) && error.keyValue?.email) {
      res
        .status(400)
        .json('Email is already in use. Please use a different email.');
      return;
    }

    console.error('Error signing up user:', error);
    res.status(500).json('Internal server error.');
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json('Invalid email or password.');
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json('Invalid email or password.');
      return;
    }

    const token = jwtSign(user._id.toString());
    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // TODO: Improve error message
      res.status(400).json(error.errors.map((err) => err.message).join(', '));
      return;
    }

    console.error('Error logging in user:', error);
    res.status(500).json('Internal server error.');
  }
}
