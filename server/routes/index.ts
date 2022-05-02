import {Router} from 'express'
import lectures from './lectures';

const authMiddleware = require('./middlewares/auth')
const user = require('./user')

const router = Router();

router.use(authMiddleware)
router.use('/user', user)
router.use('/lectures', lectures)

module.exports = router;