import Room from "../models/room.model.js";

const RoomService = {
   async createRoom(body) {
      try {
         const newRoom = new Room(body);
         await newRoom.save();
         return { pass: true, newRoom };
      } catch (error) {
         return { pass: false, reason: "Invalid Body" };
      }
   },

   async updateRoom(id, body) {
      try {
         const updatedRoom = await Room.updateOne({ _id: id }, body);
         if (!updatedRoom.nModified === 0) {
            return { pass: false, reason: "Error with updaing the room" };
         }
         return { pass: true };
      } catch (error) {
         return { pass: false, reason: "Invalid Body" };
      }
   },

   async deleteRoom(id) {
      try {
         const deletedRoom = await Room.deleteOne({ _id: id });
         if (!deletedRoom) {
            return { pass: false, reason: "Error with deleting the room" };
         }
         return { pass: true };
      } catch (error) {
         return { pass: false, reason: error };
      }
   },
};

export default RoomService;
