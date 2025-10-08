import mongoose, { Document } from 'mongoose';

export interface IAiMessage extends Document {
  sender: 'user' | 'ai';
  text: string;
  userId: mongoose.Schema.Types.ObjectId;
  sessionId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const AiMessageSchema = new mongoose.Schema<IAiMessage>(
  {
    sender: { type: String, enum: ['user', 'ai'], required: true },
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'AiSession', required: true },
  },
  { timestamps: true }
);

// Index for efficient querying
AiMessageSchema.index({ sessionId: 1, createdAt: 1 });
AiMessageSchema.index({ userId: 1, sessionId: 1 });

export const AiMessage = mongoose.model<IAiMessage>('AiMessage', AiMessageSchema);
