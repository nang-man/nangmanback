import mongoose from "mongoose";
import joi from "joi";

const chatSchema = new mongoose.Schema(
   {
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         unique: true,
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      room: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Room",
         required: true,
      },
   },
   { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

export const validateChat = (chat) => {
   const schema = joi.object({
      sender: joi.string().required(),
      content: joi.string().required(),
      room: joi.string().required(),
   });

   return schema.validate(chat);
};
