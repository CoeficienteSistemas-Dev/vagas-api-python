// import subdomain from 'express-subdomain';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from './errors/AppError';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error('ParseErr', err);
  if (err instanceof AppError) {
    console.error('⚠️❗⚠️  NEW AppError ⚠️❗⚠️ ', err);
    return response.status(err.statusCode).send({
      status: err.statusCode,
      message: err.message,
    });
    // return response.sendStatus(401).send({
    //   code: err.code,
    //   message: err.message,
    //   origin: err.origin,
    // });
  }


  return response.status(response.statusCode || 404).json({
    status: 'error',
    message: response.statusMessage,
  });
});

app.listen(59300, () => {
  console.log('-------------✔ Server UP!---------------');
});
