import { Router } from "express";
import { getById, toggleInterest, me } from './controller';

const router = Router();

router.get('/me', me)
router.get('/:id', getById);
router.put('/interest', toggleInterest);

export default router;