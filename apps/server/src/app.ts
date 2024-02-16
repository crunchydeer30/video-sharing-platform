import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import expressSession from 'express-session';
import errorHandler from './middleware/errorHandler';
import apiRouter from './router';
import config from './config';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());
app.use(morgan('tiny'));

app.use(
  expressSession({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'sessionId',
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      httpOnly: true
    }
  })
);

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
