import { RequestHandler } from 'express';
import Person from '../../models/person/Person';
import Lecture from '../../models/lecture/Lecture';
import { Person as PersonType } from '../../../common/types/person';
import Interest from '../../models/interest/Interest';

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