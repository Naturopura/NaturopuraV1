import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEquipment extends Document {
  name: string;
  quantity: number;
  price: number;
  image?: string;
  vendorId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const equipmentSchema = new Schema<IEquipment>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  image: { type: String },
  vendorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IEquipment>('Equipment', equipmentSchema);
