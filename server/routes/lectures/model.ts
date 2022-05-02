import { model, Schema } from 'mongoose';
import { personSchema } from '../persons/model';
import { Lecture} from '../../../common/types';

const schema = new Schema<Lecture>({
  id: {
    type: String,
    required: true
  },
  information: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  participants: {
    type: Number,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  lecturer: {
    type: personSchema,
    required: true
  },
});

export default model('Lecture', schema, 'lectures');