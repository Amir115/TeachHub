import { Schema, model } from 'mongoose';
import { Person } from '../../../common/types';
import { Knowledge } from '../../../common/types/knowledge';

export const personSchema = new Schema<Person>({
  id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  aboutInformation: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  knowledges: new Schema<Knowledge>({
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
  })
})

export default model('Person', personSchema, 'persons');