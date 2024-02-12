/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { validate } from '../middleware/validate';
import { AccountCreateRequest } from '@shared/schemas/';
import accountsController from '../controllers/accounts.controller';

const accountsRouter = Router();

accountsRouter.post(
  '/',
  validate(AccountCreateRequest),
  accountsController.create
);

accountsRouter.get('/:id', accountsController.getById);

accountsRouter.get('/', accountsController.getAll);

accountsRouter.delete('/:id', accountsController.remove);

export default accountsRouter;
