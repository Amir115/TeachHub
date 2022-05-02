import { RequestHandler } from 'express';
import Lecture from '../../models/lecture/Lecture';

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const entities = await Lecture.find();

    return res.send(entities);
  } catch (e) {
    return next(e);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    return lecture ? res.send(lecture) : res.status(404).send({
      message: `lecture with id ${req.params.id} not exists`,
    });
  } catch (e) {
    return next(e);
  }
};