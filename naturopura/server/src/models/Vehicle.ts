import mongoose, { Schema, Document } from "mongoose";

export interface IVehicle extends Document {
  vehicleNumber: string;
  storeManager: mongoose.Types.ObjectId;
}

const VehicleSchema: Schema = new Schema({
  vehicleNumber: { type: String, required: true },
  storeManager: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IVehicle>("Vehicle", VehicleSchema);