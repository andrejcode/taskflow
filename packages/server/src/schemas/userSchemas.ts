import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long.')
  .refine(
    (password) => /[A-Z]/.test(password),
    'Password must contain at least one uppercase letter.'
  )
  .refine(
    (password) => /[a-z]/.test(password),
    'Password must contain at least one lowercase letter.'
  )
  .refine(
    (password) => /[0-9]/.test(password),
    'Password must contain at least one digit.'
  )
  .refine(
    (password) => /[@$!%*?&]/.test(password),
    'Password must contain at least one special character (@, $, !, %, *, ?, &).'
  );

const emailSchema = z.string().email('Invalid email address.');

const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long.')
    .max(50, 'Name must be at most 50 characters long.'),
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required.'),
});

export { signupSchema, loginSchema };
