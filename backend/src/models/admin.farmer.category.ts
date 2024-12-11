import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: Buffer, required: true }, // Store URL or path to the image
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
