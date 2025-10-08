import mongoose, { Schema, Document } from "mongoose";

export interface ISensor extends Document {
  sensorId: string; // unique hardware ID of the sensor
  user: mongoose.Types.ObjectId | string;  type: string; // e.g. soil-moisture, temperature, pH, etc.
  location?: string; // optional (farm location, field name, GPS, etc.)
  installedAt: Date;
  isActive: boolean;
}

const sensorSchema = new Schema<ISensor>({
  sensorId: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  location: { type: String },
  installedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model<ISensor>("Sensor", sensorSchema);
