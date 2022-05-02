import { model, Schema } from 'mongoose';
import { ChatMessage } from '../../../common/types';

const schema = new Schema<ChatMessage>({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  user: {
    type: String,
    ref: 'Person',
    required: true
  }
});

export default model('ChatMessage', schema, 'chatMessages');