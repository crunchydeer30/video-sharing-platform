import app from './app';
import config from './config';
import docs from './docs';

app.listen(config.PORT, () => {
  console.log(
    `Server running at http://localhost:${config.PORT} in ${config.NODE_ENV} mode`
  );
  docs(app, Number(config.PORT));
});
