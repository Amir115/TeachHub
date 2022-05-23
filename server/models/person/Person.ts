import { model, Schema, PassportLocalSchema, PassportLocalModel, PassportLocalDocument } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

import { Person } from '../../../common/types';

type PersonType = Person & PassportLocalDocument

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
  interests: {
    type: [String],
    ref: 'Interest',
    required: true
  },
  aboutInformation: String,
  education: String,
  birthDate: Date
}) as PassportLocalSchema<Person, PassportLocalModel<PersonType>>

personSchema.plugin(passportLocalMongoose)

const person: PassportLocalModel<PersonType> = model<PersonType>('Person', personSchema, 'persons')

export default person;