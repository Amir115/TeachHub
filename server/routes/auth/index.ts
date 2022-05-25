import { Router } from "express";
import { me } from './controller';

const router = Router();

router.get('/me', me);

export default router;