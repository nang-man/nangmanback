import mongoose from "mongoose";
import joi from "joi";

const roomSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      maxNum: {
         type: Number,
         required: true,
      },
      tags: {
         type: [String],
      },
      owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      participants: {
         type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      },
   },
   { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;

export const validateRoom = (room) => {
   const schema = joi.object({
      name: joi.string().required(),
      maxNum: joi.number().required(),
      owner: joi.string().required(),
   });

   return schema.validate(room);
};
