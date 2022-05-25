import { RequestHandler } from 'express';
import { Document, ObjectId } from 'mongoose';
import { Person as PersonType } from '../../../common/types/person';
import { getRating } from '../user/controller';

export const me: RequestHandler = async (req, res, next) => {
  try {
    const person = (req.user as Document<ObjectId, any, PersonType>).toObject()
    const level = await getRating(person._id);

    res.send({ ...person, level })
  } catch (e) {
    return next(e);
  }
};