import { z } from 'zod';

export const formSchema = z.object({
  userName: z.string().min(2, { message: "user name must be at least 2 chars" }),
  userEmail: z.string().email({ message: "invalid email address" }),
  userPassword: z.string().min(6, { message: "password must be at least 6 characters" }),
});