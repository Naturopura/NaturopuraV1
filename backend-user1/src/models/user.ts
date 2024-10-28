import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.default.isEmail,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // timestamps will automatically create 'createdAt' and 'updatedAt' fields.

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
