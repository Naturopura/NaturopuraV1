import mongoose, { Schema, Document } from "mongoose";

export interface IStoreProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  seller: {
    name: string;
    contact: string;
  };
  storeManager: mongoose.Types.ObjectId;
  status: "in progress" | "delivered";
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StoreProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    seller: {
      name: { type: String, required: true },
      contact: { type: String, required: true }
    },
    storeManager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["in progress", "delivered"], default: "in progress" },
    deliveredAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model<IStoreProduct>("StoreProduct", StoreProductSchema);