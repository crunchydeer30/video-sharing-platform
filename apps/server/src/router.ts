import { Router } from 'express';

import healthCheckRouter from './routes/healthcheck.routes';
import accountsRouter from './routes/accounts.routes';
import authRouter from './routes/auth.routes';
import channelsRouter from './routes/channels.routes';
import videosRouter from './routes/videos.routes';

const apiRouter = Router();

apiRouter.use('/healthcheck', healthCheckRouter);
apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/channels', channelsRouter);
apiRouter.use('/videos', videosRouter);

export default apiRouter;
