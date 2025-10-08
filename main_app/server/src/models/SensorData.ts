import mongoose, { Schema, Document } from "mongoose";

export interface ISensorData extends Document {
  sensor: mongoose.Types.ObjectId; // reference to Sensor
  user: mongoose.Types.ObjectId;   // reference to User (redundant but useful for faster queries)
  value: number;
  timestamp: Date;
}

const sensorDataSchema = new Schema<ISensorData>({
  sensor: { type: Schema.Types.ObjectId, ref: "Sensor", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ISensorData>("SensorData", sensorDataSchema);
