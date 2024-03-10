/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => res.send('hellow world'));

app.listen(port, () => {
  console.log('running...');
});
