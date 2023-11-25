import mongoose, { mongo } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uuidv4,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      maxlength: 8,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: true,
    },
    adminState: {
      type: Number,
      default: 0,
    },
    followings: [
      {
        type: String,
      },
    ],
    followers: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
