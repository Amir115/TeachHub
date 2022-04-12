const express = require('express')
const router = express.Router()

const authMiddleware = require('./middlewares/auth')
const user = require('./user')

router.use(authMiddleware)
router.use('/user', user)

module.exports = router;