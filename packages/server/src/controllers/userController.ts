import type { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import { loginSchema, signupSchema } from '@/shared/schemas/userSchemas';
import { hashPassword, jwtSign } from '@/utils/auth';
import { isMongoDBDuplicateKeyError } from '@/utils/mongo';
import { mapUserToDto } from '@/services/userService';

export async function signupUser(req: Request, res: Response) {
  try {
    const { name, email, password } = signupSchema.parse(req.body);

    const hash = await hashPassword(password);
    const user = await User.create({ name, email, password: hash });

    const userDto = mapUserToDto(user);
    const token = jwtSign(user._id.toString());
    res.status(201).json({ token, user: userDto });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send('Invalid payload.');
      return;
    }

    if (isMongoDBDuplicateKeyError(error) && error.keyValue?.email) {
      res
        .status(400)
        .send('Email is already in use. Please use a different email.');
      return;
    }

    console.error('Error signing up user:', error);
    res.status(500).send('Internal server error.');
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send('Invalid email or password.');
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).send('Invalid email or password.');
      return;
    }

    const userDto = mapUserToDto(user);
    const token = jwtSign(user._id.toString());
    res.json({ token, user: userDto });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send('Invalid payload.');
      return;
    }

    console.error('Error logging in user:', error);
    res.status(500).send('Internal server error.');
  }
}

export async function getUserProfile(req: Request, res: Response) {
  const { userId } = req;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send('User not found.');
      return;
    }

    const userDto = mapUserToDto(user);
    res.json(userDto);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).send('Internal server error.');
  }
}
