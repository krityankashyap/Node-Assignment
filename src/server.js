import express from 'express';
import { PORT } from './config/index.js';
import apiRouter from './routes/index.js';
import { connectDB } from './config/dbConfig.js';


const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, async ()=>{
  console.log("Server is started at PORT: ",PORT);

  await connectDB()
})