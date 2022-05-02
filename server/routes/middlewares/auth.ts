import {RequestHandler} from 'express'

const authHandler: RequestHandler = (req, res, next) => {
    next();
}

export default authHandler;