import {Router} from 'express'

import authMiddleware from './middlewares/auth';

import lecturesRouter from './lectures';
import userRouter from './user';

const router = Router();

router.use(authMiddleware)

router.use('/user', userRouter)
router.use('/lectures', lecturesRouter)

export default router;