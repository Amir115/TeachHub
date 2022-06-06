import { RequestHandler } from 'express';
import Person from '../../models/person/Person';

export const me: RequestHandler = async (req, res, next) => {
  try {
    // @ts-ignore
    const person = (await Person.findById(req.user.id).populate('interests')).toObject();

    res.send(person)
  } catch (e) {
    return next(e);
  }
};