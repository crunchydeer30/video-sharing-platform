import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import expressSession from 'express-session';

import errorHandler from './middleware/errorHandler';

import apiRouter from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    name: 'sessionId',
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    }
  })
);

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
