import { Router } from "express";
import { getById, toggleInterest } from './controller';

const router = Router();

router.get('/:id', getById);
router.put('/interest', toggleInterest);

export default router;