import { model, Schema } from 'mongoose';
import { UserSession } from '../../../common/types';

const schema = new Schema<UserSession>({
  id: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  user: {
    type: String,
    ref: 'Person',
    required: true
  }
});

export default model('UserSession', schema, 'userSessions');