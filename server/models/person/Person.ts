import { model, Schema, PassportLocalSchema, PassportLocalModel, PassportLocalDocument } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

import { Person, Knowledge } from '../../../common/types';

export const personSchema = new Schema<Person>({
  id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  aboutInformation: String,
  education: String,
  birthDate: Date,
  knowledges: [new Schema<Knowledge>({
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
  })]
}) as PassportLocalSchema

type PersonType = Person & PassportLocalDocument

personSchema.plugin(passportLocalMongoose)

const person: PassportLocalModel<PersonType> = model<PersonType>('Person', personSchema, 'persons')

export default person;