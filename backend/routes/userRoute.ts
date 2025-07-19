import express from 'express';
import { registerUser, loginUser, adminLogin } from '../controllers/userController.ts';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

export default userRouter;