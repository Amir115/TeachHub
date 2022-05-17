import { Router } from "express";
import { getAll, getById, insert } from './controller';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', upload.single('image'), insert);

export default router;