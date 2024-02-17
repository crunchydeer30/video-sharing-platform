import { accountCreateBody } from '@shared/schemas';
import { z } from 'zod';

export enum Protection {
  Authorized = 'Authorized',
  Unauthorized = 'UNAUTHORIZED'
}

export const accountCreateBodyConfirmPassword = accountCreateBody
  .extend({
    password_confirmation: z
      .string({
        required_error: 'Password confirmation is required'
      })
      .min(1, 'Password confirmation is required')
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation']
  });

export type AccountCreateBodyConfirmPassword = z.infer<
  typeof accountCreateBodyConfirmPassword
>;
