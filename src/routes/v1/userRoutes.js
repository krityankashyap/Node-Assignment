import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  subscribe,
  getEarnings,
  getAllUsers,
} from '../../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', register);

userRouter.post('/login', login);

userRouter.get('/me', getProfile);

userRouter.put('/me',  updateProfile);

userRouter.delete('/me',  deleteProfile);

userRouter.post('/subscribe', subscribe);

userRouter.get('/earnings', getEarnings);

userRouter.get('/', getAllUsers);

export default userRouter;