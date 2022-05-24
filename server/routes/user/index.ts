import { Router } from "express";
import { getById, getSubscribedLectures, toggleInterest, toggleSubscribe } from './controller';

const router = Router();

router.get('/lectures', getSubscribedLectures);
router.get('/:id', getById);
router.put('/interest', toggleInterest);
router.put('/:lectureId/subscribe', toggleSubscribe)

export default router;