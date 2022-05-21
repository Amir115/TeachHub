import { RequestHandler } from "express";
import Model from "../../models/lecture/Lecture";
import { Lecture } from "../../../common/types";
import * as fs from "fs";

import { Person as PersonType } from "../../../common/types/person";
import {
  LectureViewModel,
  Lecture as LectureType,
} from "../../../common/types/lecture/lecture";

const getViewModel = (lecture: LectureType, me: PersonType) => {
  const rated = lecture.level.includes(me);

  return { ...lecture, level: lecture.level.length, rated } as LectureViewModel;
};

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const entities = await Model.find().populate("lecturer");
    const me = req.user as PersonType;
    const viewModels = entities.map((x) => getViewModel(x, me));

    return res.send(viewModels);
  } catch (e) {
    return next(e);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const lecture = await Model.findById(req.params.id).populate("lecturer");
    const me = req.user as PersonType;

    return lecture
      ? res.send(getViewModel(lecture, me))
      : res.status(404).send({
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
      contentType: req.file.mimetype,
      data: img,
      url: `uploads/${req.file.originalname}`,
    };

    const lecture = JSON.parse(req.body.lecture);

    const newLecture: Lecture = { ...lecture, image: final_img };

    await Model.create(newLecture);

    res.sendStatus(201);
  } catch (e) {
    return next(e);
  }
};

export const toggleRating: RequestHandler = async (req, res, next) => {
  try {
    const lecture = await Model.findById(req.params.id);
    const me = req.user as PersonType;
    const myIndex = lecture.level.findIndex((x) => x.id === me.id);

    if (myIndex === -1) {
      lecture.level.push(me);
    } else {
      lecture.level.splice(myIndex, 1);
    }

    lecture.save();

    return res.send(lecture);
  } catch (e) {
    return next(e);
  }
};
