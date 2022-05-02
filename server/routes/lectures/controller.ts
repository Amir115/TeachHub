import { NextFunction, Request, Response } from 'express';
import Lecture from './model';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entities = await Lecture.find();

    return res.send(entities);
  } catch (e) {
    return next(e);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Lecture.findById(req.params.id);

    return student ? res.send(student) : res.status(404).send({
      message: `student with id ${req.params.id} not exists`,
    });
  } catch (e) {
    return next(e);
  }
};