import { Schema, model } from 'mongoose';
import { Person } from '../../../common/types';

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
  }
})

export default model('Person', personSchema, 'persons');