import mongoose, { Document } from 'mongoose';

export interface IAiSession extends Document {
  name: string;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
  isActive: boolean;
}

const AiSessionSchema = new mongoose.Schema<IAiSession>(
  {
    name: { type: String, required: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessageAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index for efficient querying
AiSessionSchema.index({ userId: 1, createdAt: -1 });
AiSessionSchema.index({ userId: 1, isActive: 1 });

export const AiSession = mongoose.model<IAiSession>('AiSession', AiSessionSchema);
