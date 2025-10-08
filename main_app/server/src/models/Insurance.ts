import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema(
  {
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    insuranceType: { type: String, required: true }, // e.g., "Crop", "Livestock"
    cropType: { type: String },
    landSize: { type: Number },
    premiumAmount: { type: Number, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },  // <-- Add 'completed' here
  },
  { timestamps: true }
);


export const Insurance = mongoose.model('Insurance', insuranceSchema);
