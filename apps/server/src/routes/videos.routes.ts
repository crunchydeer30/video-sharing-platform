/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import videosController from '../controllers/videos.controller';
import { auth } from '../middleware/auth';
import upload from '../config/uploads';

const videosRouter = Router();

videosRouter.get('/', auth.optional, videosController.list);
videosRouter.post(
  '/upload',
  auth.required,
  upload.single('file'),
  videosController.upload
);

export default videosRouter;
