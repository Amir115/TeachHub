import {Router} from 'express'

import connectEnsureLogin from 'connect-ensure-login'

import lecturesRouter from './lectures';
import userRouter from './user';
import authRouter from './auth';
import loginRouter from './login';
import interestRouter from './interests';

const router = Router();

const ensureLoggedInMiddleware = connectEnsureLogin.ensureLoggedIn()

router.use('/login', loginRouter)
router.use('/auth', ensureLoggedInMiddleware, authRouter)
router.use('/user', ensureLoggedInMiddleware, userRouter)
router.use('/lectures', ensureLoggedInMiddleware, lecturesRouter)
router.use('/interests', ensureLoggedInMiddleware, interestRouter)

export default router;