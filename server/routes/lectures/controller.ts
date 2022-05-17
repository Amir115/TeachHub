import { RequestHandler } from 'express';
import Model from '../../models/lecture/Lecture';
import { Lecture } from '../../../common/types';
import * as fs from 'fs';

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const entities = await Model.find().populate('lecturer');

    return res.send(entities);
  } catch (e) {
    return next(e);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const lecture = await Model.findById(req.params.id).populate('lecturer');

    return lecture ? res.send(lecture) : res.status(404).send({
      message: `lecture with id ${req.params.id} not exists`,
    });
  } catch (e) {
    return next(e);
  }
};

export const insert: RequestHandler = async (req, res, next) => {
  try {
    const img = fs.readFileSync(`uploads/${req.file.filename}`);
    const final_img = {
      contentType:req.file.mimetype,
      data: img
    };

    const lecture = JSON.parse(req.body.lecture);

    const newLecture: Lecture = ({...lecture, image: final_img});

    await Model.create(newLecture);

    res.sendStatus(201);
  } catch (e) {
  return next(e);
}
}