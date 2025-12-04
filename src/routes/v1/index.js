import express from "express";

const v1Routes= express.Router();

v1Routes.get('/ping', (req,res)=>{
  res.status(200).json({
    msg: 'pong',
    success: true
  });
});


export default v1Routes;