import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
