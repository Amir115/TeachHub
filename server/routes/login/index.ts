import { Router } from "express";
import passport from 'passport';

import { login, signup, logout } from './controller';

const router = Router();

router.post('/', passport.authenticate('local'), login);
router.post('/signup', signup);
router.post('/logout', logout);

export default router;