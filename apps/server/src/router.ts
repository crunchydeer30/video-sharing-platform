import { Router } from 'express';

import healthCheckRouter from './routes/healthcheck.routes';
import accountsRouter from './routes/accounts.routes';
import authRouter from './routes/auth.routes';
import channelsRouter from './routes/channels.routes';

const apiRouter = Router();

apiRouter.use('/healthcheck', healthCheckRouter);
apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/channels', channelsRouter);

export default apiRouter;
