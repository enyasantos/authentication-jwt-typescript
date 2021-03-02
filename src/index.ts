import 'reflect-metadata';
import express from 'express';

import 'dotenv/config';
import './database/connection';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => console.log('🔥 Server started at http://localhost:' + process.env.PORT));