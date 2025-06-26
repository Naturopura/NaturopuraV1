import mongoose, { Schema, Document } from 'mongoose';

interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  product: {
    name: string;
    price: number;
    unit: string;
    
  };
}

export interface CartDocument extends Document {
  userId: mongoose.Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  
}

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    product: {
      name: String,
      price: Number,
      unit: String
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Cart = mongoose.model<CartDocument>('Cart', cartSchema);
