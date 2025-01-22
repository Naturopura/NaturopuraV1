import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true }, // Store URL or path to the image
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
