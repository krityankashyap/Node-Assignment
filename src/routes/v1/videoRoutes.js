import express from 'express';
import { createVideo, deleteVideo, getAllVideos, getOneVideo, getVideoAnalytics, updateVideo, watchVideo } from '../../controllers/videoController.js';


const videoRouter = express.Router();

videoRouter.get('/', getAllVideos);

videoRouter.get('/:id', getOneVideo);

videoRouter.get('/:id/analytics', getVideoAnalytics);

videoRouter.post('/', createVideo);

videoRouter.put('/:id', updateVideo);

videoRouter.delete('/:id', deleteVideo);

videoRouter.post('/:id/watch', watchVideo);

export default videoRouter;