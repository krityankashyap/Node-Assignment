import express from "express"
import v1Routes from "./v1/index.js";
import userRouter from "./v1/userRoutes.js";
import videoRouter from "./v1/videoRoutes.js";

const apiRouter= express.Router();

apiRouter.use('/v1', v1Routes);

apiRouter.use('/users', userRouter);

apiRouter.use('/videos', videoRouter);

export default apiRouter;