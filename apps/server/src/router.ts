import { Router } from 'express';

import healthCheckRouter from './routes/healthcheck.routes';
import accountsRouter from './routes/account.routes';

const apiRouter = Router();

apiRouter.use('/healthcheck', healthCheckRouter);
apiRouter.use('/accounts', accountsRouter);

export default apiRouter;
