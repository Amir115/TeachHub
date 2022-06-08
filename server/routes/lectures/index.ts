import { Router } from "express";
import { getAll, getById, insert, update, addRating } from './controller';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsRoot/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', upload.single('image'), insert);
router.put('/:id/rating', addRating);
router.put('/:id', upload.single('image'), update);

export default router;