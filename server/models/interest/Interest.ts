import { model, Schema } from 'mongoose';
import { Interest} from '../../../common/types';

const schema = new Schema<Interest>({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  }
});

export default model('Interest', schema, 'interests');