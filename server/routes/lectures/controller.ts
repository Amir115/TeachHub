import { RequestHandler } from "express";
import Model from "../../models/lecture/Lecture";
import { Lecture } from "../../../common/types";
import * as fs from "fs";

import { Person as PersonType } from "../../../common/types/person";
import { LectureRating } from "../../../common/types/lecture/lecture";
import { Image } from "../../../common/types/lecture/new-lecture";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const entities = await Model.find().populate("lecturer");

    return res.send(entities);
  } catch (e) {
    return next(e);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const lecture = await Model.findById(req.params.id).populate("lecturer");

    return lecture
      ? res.send(lecture)
      : res.status(404).send({
        message: `lecture with id ${req.params.id} not exists`,
      });
  } catch (e) {
    return next(e);
  }
};

export const insert: RequestHandler = async (req, res, next) => {
  try {
    const img = fs.readFileSync(`uploadsRoot/uploads/${req.file.filename}`);
    const final_img: Image = {
      data: img,
      url: `/uploads/${req.file.originalname}`,
    };

    const lecture = JSON.parse(req.body.lecture);

    const newLecture: Lecture = { ...lecture, image: final_img };

    await Model.create(newLecture);

    res.sendStatus(201);
  } catch (e) {
    return next(e);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    let newLecture;

    if (!req.file) {
      newLecture = JSON.parse(req.body.lecture);
      const { image, ...lecture } = newLecture;
      newLecture = lecture;
    }
    else {
      const img = fs.readFileSync(`uploadsRoot/uploads/${req.file.filename}`);
      const final_img: Image = {
        data: img,
        url: `/uploads/${req.file.originalname}`,
      };

      const lecture = JSON.parse(req.body.lecture);

      newLecture = { ...lecture, image: final_img };
    }

    if (typeof(newLecture.tags) === 'string') newLecture.tags = newLecture.tags.split(',');

    await Model.findByIdAndUpdate(req.params.id, { $set: newLecture });

    res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
};

export const addRating: RequestHandler = async (req, res, next) => {
  try {
    const lecture = await Model.findById(req.params.id);
    const currentUser = req.user as PersonType;
    const currentRating = lecture.ratings.find(x => x.user._id.toString() === currentUser._id.toString());

    if (currentRating) {
      currentRating.rating = req.body.rating;
    } else {
      if (!lecture.ratings) {
        lecture.ratings = [];
      }

      lecture.ratings.push({
        rating: req.body.rating as number,
        user: req.user
      } as LectureRating);
    }

    await lecture.save();

    return res.send(lecture);
  } catch (e) {
    return next(e);
  }
};
