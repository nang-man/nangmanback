import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      default: uuidv4,
      unique: true,
      required: true,
    },
    roomName: {
      type: String,
      unique: true,
      required: true,
    },
    maxNum: {
        type: Number,
        required: true,
    },
    isGuest: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    participants: {
        type: [ mongoose.Schema.Types.ObjectId ],
        required: true
    },
    chats: {
        type: [ mongoose.Schema.Types.ObjectId ],
        default: [],
    }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
