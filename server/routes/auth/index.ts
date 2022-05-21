import { Router } from "express";
import { login, register, me } from './controller';

const router = Router();

router.get('/me', me);
router.post('/login', login);
router.post('/register', register);

export default router;