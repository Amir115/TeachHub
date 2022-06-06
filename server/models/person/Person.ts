import {model, Schema, PassportLocalSchema, PassportLocalModel, PassportLocalDocument, Types} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

import {Person} from '../../../common/types';

const {ObjectId} = Types;

type PersonType = Person & PassportLocalDocument

export const personSchema = new Schema<Person>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  interests: [{
    type: ObjectId, ref: 'Interest', default: []
  }],
  subscribedLectures: {
    type: [ObjectId],
    ref: 'Lecture',
  },
  aboutInformation: String,
  education: String,
  birthDate: Date
}) as PassportLocalSchema<Person, PassportLocalModel<PersonType>>

personSchema.plugin(passportLocalMongoose)

const person: PassportLocalModel<PersonType> = model<PersonType>('Person', personSchema, 'persons')

export default person;