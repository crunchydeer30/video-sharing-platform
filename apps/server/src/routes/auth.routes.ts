/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { validate } from '../middleware/validate';
import { LoginRequest } from '@shared/schemas';
import { AccountCreateRequest } from '@shared/schemas';
import authController from '../controllers/auth.controller';
import { auth } from '../middleware/auth';

const authRouter = Router();

authRouter.post('/login', validate(LoginRequest), authController.login);

authRouter.post(
  '/register',
  validate(AccountCreateRequest),
  authController.register
);

authRouter.post('/logout', auth.required, authController.logout);

export default authRouter;
