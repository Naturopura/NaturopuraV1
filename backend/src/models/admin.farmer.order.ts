import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  farmer: {
    type: String,
    ref: "Admin",
    required: true,
  },
  firstName: { type: String, required: [true, "Please enter first name"] },
  lastName: {
    type: String,
    required: [true, "Please enter last name"],
  },
  companyName: { type: String },
  email: { type: String, required: [true, "Please enter email"] },
  phone: {
    type: String,
    required: [true, "Please enter mobile number"],
  },
  address: { type: String, required: [true, "Please enter address"] },
  address2: { type: String },
  country: { type: String, required: [true, "Please enter country"] },
  zipCode: { type: String, required: [true, "Please enter zipCode"] },
  city: { type: String, required: [true, "Please enter city"] },
  subtotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  orderItems: {
    _id: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
