/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import channelsController from '../controllers/channels.controller';
import { auth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { ChannelCreateRequest } from '@shared/schemas';

const channelsRouter = Router();

channelsRouter.get('/', auth.optional, channelsController.getAll);

channelsRouter.get('/:id', auth.optional, channelsController.getById);

channelsRouter.post(
  '/',
  auth.required,
  validate(ChannelCreateRequest),
  channelsController.create
);

channelsRouter.delete('/:id', auth.required, channelsController.remove);

export default channelsRouter;
