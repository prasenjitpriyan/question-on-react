import { z } from 'zod';

export const UserValidationSchema = z.object({
  firstname: z
    .string({ required_error: 'First name is required' })
    .trim()
    .min(1, { message: 'First name is required' }),

  lastname: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .min(1, { message: 'Last name is required' }),

  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email')
    .toLowerCase(),

  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),

  role: z.enum(['admin', 'user']).optional().default('user'),
});

export const LoginValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email'),

  password: z.string().min(1, { message: 'Password is required' }),
  role: z.enum(['user', 'admin'], {
    required_error: 'Please select a role',
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email to reset your password'),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'A reset token is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
