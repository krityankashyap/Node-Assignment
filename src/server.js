import express from 'express';
import { PORT } from './config/index.js';


const app = express();

app.get('/ping', (req,res)=>{
  res.status(200).json({
    msg: "pong",
    success: true,
  });
});

app.listen(PORT, ()=>{
  console.log("Server is started at PORT: ",PORT);
})