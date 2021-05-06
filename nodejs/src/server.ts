// import subdomain from 'express-subdomain';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error('ParseErr', err);

  return response.status(response.statusCode || 404).json({
    status: 'error',
    message: response.statusMessage,
  });
});

app.listen(59300, () => {
  console.log('-------------✔ Server UP!---------------');
});
