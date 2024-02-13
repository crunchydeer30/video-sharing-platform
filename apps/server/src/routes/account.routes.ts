/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import accountsController from '../controllers/accounts.controller';
import { auth } from '../middleware/auth';

const accountsRouter = Router();

accountsRouter.get('/:id', auth.optional, accountsController.getById);

accountsRouter.get('/', auth.optional, accountsController.getAll);

accountsRouter.delete('/:id', auth.optional, accountsController.remove);

export default accountsRouter;
