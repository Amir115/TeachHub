import { model, Schema } from 'mongoose';
import { Lecture} from '../../../common/types';

const lectureRating = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  rating: {
    type: Number
  }
})

const schema = new Schema<Lecture>({
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
    contentType: String,
    url: String
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
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  ratings: {
    type: [lectureRating],
    default: []
  }
});

export default model('Lecture', schema, 'lectures');