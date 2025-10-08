import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  contact: {
    phone: String,
    email: String
  },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
}, {
  timestamps: true
});

export default mongoose.model('Store', storeSchema);
