import {Router} from 'express'

import connectEnsureLogin from 'connect-ensure-login'

import lecturesRouter from './lectures';
import userRouter from './user';
import authRouter from './auth';
import loginRouter from './login';

const router = Router();

const ensureLoggedInMiddleware = connectEnsureLogin.ensureLoggedIn()

router.use('/login', loginRouter)
router.use('/auth', ensureLoggedInMiddleware, authRouter)
router.use('/user', ensureLoggedInMiddleware, userRouter)
router.use('/lectures', ensureLoggedInMiddleware, lecturesRouter)

export default router;