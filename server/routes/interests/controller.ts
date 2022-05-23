import { RequestHandler } from 'express';
import Model from '../../models/interest/Interest';

export const getAll: RequestHandler = async (req, res, next) => {
    try {
      const interests = await Model.find();
  
      return res.send(interests);
    } catch (e) {
      return next(e);
    }
  };
  