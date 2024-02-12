import { Router } from 'express';

import healthCheckRouter from './routes/healthcheck.routes';

const apiRouter = Router();

apiRouter.use('/healthcheck', healthCheckRouter);

export default apiRouter;
