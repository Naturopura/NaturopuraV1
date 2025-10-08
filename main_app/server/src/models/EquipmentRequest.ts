import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEquipmentRequest extends Document {
  equipmentId: Types.ObjectId;
  farmerId: Types.ObjectId;
  vendorId: Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}

const equipmentRequestSchema = new Schema<IEquipmentRequest>({
  equipmentId: { type: Schema.Types.ObjectId, ref: 'Equipment', required: true },
  farmerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IEquipmentRequest>('EquipmentRequest', equipmentRequestSchema);
