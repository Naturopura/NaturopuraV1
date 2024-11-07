const mongoose = require('mongoose');

<<<<<<< HEAD

 const productSchema = new mongoose.Schema({
=======
const productSchema = new mongoose.Schema({
>>>>>>> rakesh-bin
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, 
  name: { type: String, required: [true, "Please enter Name"] },
  category: { type: String, required: [true, "Please enter category"] },
  price: { type: Number, required: [true, "Please enter price"]},
<<<<<<< HEAD
=======
  unit: { 
    type: String, 
    required: [true, "Please select a unit"], 
    enum: [
      "g",       // gram
      "kg",      // kilogram
      "ml",      // milliliter
      "L",       // liter
    ] 
  },
>>>>>>> rakesh-bin
  quantity: { type: Number, required: [true, "Please enter quantity"]},
  description: { type: String },
  image: { type: Buffer, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create Product Model
const Product = mongoose.model('Product', productSchema);

<<<<<<< HEAD
export default Product
=======
export default Product;
>>>>>>> rakesh-bin
