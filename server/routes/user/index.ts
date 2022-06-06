import { Router } from "express";
import {getById, getSubscribedLectures, updateInterests, me, toggleSubscribe, getUserRating} from './controller';

const router = Router();

router.get('/lectures', getSubscribedLectures);
router.get('/me', me)
router.get('/:id', getById);
router.get('/:id/rating', getUserRating);
router.put('/interests', updateInterests);
router.put('/:lectureId/subscribe', toggleSubscribe)

export default router;