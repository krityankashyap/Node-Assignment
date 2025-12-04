import express from 'express';
import { PORT } from './config/index.js';
import apiRouter from './routes/index.js';


const app = express();

app.use('/api', apiRouter);

app.listen(PORT, ()=>{
  console.log("Server is started at PORT: ",PORT);
})