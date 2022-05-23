import { Router } from "express";
import { getAll } from './controller';

const router = Router();

router.get('/', getAll)

export default router;