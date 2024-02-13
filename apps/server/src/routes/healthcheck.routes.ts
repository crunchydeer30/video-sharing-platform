import { Router } from 'express';
import { auth } from '../middleware/auth';

const healthCheckRouter = Router();

healthCheckRouter.get('/', auth.optional, (_req, res) => {
  /*
    #swagger.tags = ['Healthcheck']
    #swagger.summary = 'Healthcheck'
    #swagger.description = 'Ensure that app is up and running'
  */
  res.status(200).json({
    message: 'Server is up and running'
  });
});

export default healthCheckRouter;
