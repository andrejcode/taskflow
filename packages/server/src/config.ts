import 'dotenv/config';
import { z } from 'zod';

const { env } = process;

const schema = z
  .object({
    env: z
      .enum(['development', 'production', 'staging', 'test'])
      .default('development'),
    port: z.coerce.number().default(3000),
    dbUri: z
      .string()
      .nonempty({ message: 'Environment variable DB_URI is required.' }),
    jwtSecret: z
      .string()
      .nonempty({ message: 'Environment variable JWT_SECRET is required.' }),
  })
  .readonly();

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  dbUri: env.DB_URI,
  jwtSecret: env.JWT_SECRET,
});

export default config;
