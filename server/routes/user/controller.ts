import { RequestHandler } from 'express';
import { Types } from 'mongoose'
import Person from '../../models/person/Person';
import Lecture from '../../models/lecture/Lecture';
import { Person as PersonType } from '../../../common/types/person';
import Interest from '../../models/interest/Interest';

const { ObjectId } = Types;

const getRating = async (id: string) => {
  const lecturerLectures = await Lecture.find({ lecturer: id });

  return lecturerLectures.reduce((sum, x) => sum += x.level.length, 0) / lecturerLectures.length;
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    const level = await getRating(person.id);

    return person
      ? res.send({ ...person, level })
      : res.status(404).send({
        message: `person with id ${req.params.id} not exists`,
      });
  } catch (e) {
    return next(e);
  }
};

export const toggleInterest: RequestHandler = async (req, res, next) => {
  try {
    const model = await Person.findById((req.user as PersonType).id);
    const interest = await Interest.findById(req.body)
    const myIndex = model.interests.findIndex(x => x.id === interest.id);

    if (myIndex === -1) {
      model.interests.push(interest);
    } else {
      model.interests.splice(myIndex, 1);
    }

    model.save();

    return res.send(model);
  } catch (e) {
    return next(e);
  }
};

export const toggleSubscribe: RequestHandler = async (req, res, next) => {
  try {
    const model = await Person.findOne({ id: (req.user as PersonType).id });
    const newLecture = await Lecture.findById(new ObjectId(req.params.lectureId));
    const lectureIndex = model.subscribedLectures.findIndex(x => x._id === newLecture._id);

    if (lectureIndex === -1) {
      model.subscribedLectures.push(newLecture);
      newLecture.participants++;
    } else {
      model.subscribedLectures.splice(lectureIndex, 1);
      newLecture.participants--;
    }

    await model.save();
    await newLecture.save();

    return res.send(model);
  } catch (e) {
    return next(e);
  }
};

export const getSubscribedLectures: RequestHandler = async (req, res, next) => {  
  try {
    const model = await Person.findOne({ id: (req.user as PersonType).id });
    
    return res.send(model.subscribedLectures);
  } catch (e) {
    return next(e);
  }
}