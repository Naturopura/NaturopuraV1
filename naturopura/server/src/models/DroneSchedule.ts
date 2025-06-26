import mongoose, { Document, Schema } from 'mongoose';

export interface IDroneSchedule extends Document {
  farmerId: mongoose.Types.ObjectId;
  date: Date;
  fieldName: string;
  provider: string;
  currentLocation: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const DroneScheduleSchema: Schema = new Schema(
  {
    farmerId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, required: true },
    fieldName: { type: String, required: true },
    provider: { type: String, required: true },
    currentLocation: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const DroneSchedule = mongoose.model<IDroneSchedule>('DroneSchedule', DroneScheduleSchema);

export default DroneSchedule;
