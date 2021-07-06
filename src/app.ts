import express from 'express';
import { router } from '@routes/index';
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(router);
export { app };
