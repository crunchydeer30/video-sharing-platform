import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as openapi from './openapi.json';
import redoc from 'redoc-express';
import config from '../config';

// Generates redoc and swaggerUi pages

const docs = (app: Express, port: number) => {
  app.use('/api/docs/swagger', swaggerUi.serve, swaggerUi.setup(openapi));

  app.get('/api/docs/openapi.json', (_req: Request, res: Response) => {
    res.sendFile('/docs/openapi.json', {
      root: config.NODE_ENV === 'production' ? '.' : 'src'
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.use(
    '/api/docs/',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    redoc({
      title: 'REST Api Documentation',
      specUrl: '/api/docs/openapi.json'
    })
  );

  console.log(`Docs are available at http://localhost:${port}/api/docs`);
  console.log(
    `Swagger UI is available at http://localhost:${port}/api/docs/swagger`
  );
};

export default docs;
