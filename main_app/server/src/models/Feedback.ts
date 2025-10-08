import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  userId: string;
  name?: string;
  email?: string;
  message: string;
  phoneNumber?: string;
  rating?: number;
  category?: string;
  createdAt: Date;
}

const FeedbackSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  message: { type: String, required: true },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be an integer between 1 and 5',
    },
  },
  category: {
    type: String,
    enum: ['Bug', 'Suggestion', 'General', 'Other'],
    default: 'General',
  },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
export default Feedback;
