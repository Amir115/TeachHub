import { RequestHandler } from 'express';
import { meanBy, sum } from 'lodash';
import { Types } from 'mongoose'
import Person from '../../models/person/Person';
import Lecture from '../../models/lecture/Lecture';
import {Person as PersonType, Interest as InterestType, Lecture as LectureType} from '../../../common/types';

export const me : RequestHandler = async (req, res, next) => {
  try {
    //@ts-ignore
    const model = await Person.findById(req.user._id).populate('interests');
    console.log(model.interests);

    return res.send(model);
  } catch (e) {
    return next(e);
  }
};

const { ObjectId } = Types;

export const getUserRating: RequestHandler = async (req, res, next) => {
  try{
    const lecturerLectures = (await Lecture.find({ lecturer: req.params.id })) as LectureType[];
    const lecturesRatings = lecturerLectures.map(lecture => meanBy(lecture.ratings, x => x.rating));

    return res.send({rating: sum(lecturesRatings) / lecturesRatings.length})
  }catch (e){
    return next(e);
  }

};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);

    return person
      ? res.send(person)
      : res.status(404).send({
        message: `person with id ${req.params.id} not exists`,
      });
  } catch (e) {
    return next(e);
  }
};

export const updateInterests: RequestHandler = async (req, res, next) => {
  try {
    const me = req.user as PersonType;
    const model = await Person.findById(me._id).populate('interests');
    model.interests = JSON.parse(req.body.interests) as InterestType[];

    await model.save();

  } catch (e) {
    return next(e);
  }
}

export const toggleSubscribe: RequestHandler = async (req, res, next) => {
  try {
    const model = await Person.findOne({ id: (req.user as PersonType)._id });
    const newLecture = await Lecture.findById(new ObjectId(req.params.lectureId));
    const lectureIndex = model.subscribedLectures.findIndex(x => x._id === newLecture._id);

    if (lectureIndex !== -1) return res.sendStatus(400);

    model.subscribedLectures.push(newLecture);
    newLecture.participants++;

    await model.save();
    await newLecture.save();

    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
};

export const getSubscribedLectures: RequestHandler = async (req, res, next) => {
  try {
    const model = await Person.findOne({ id: (req.user as PersonType)._id });
    
    return res.send(model.subscribedLectures);
  } catch (e) {
    return next(e);
  }
}