import { validateRoom } from "../models/room.model.js";
import {
   handleServerError,
   formatError,
   checkRoomExistence,
} from "../lib/utils.js";
import RoomService from "../services/room.service.js";

const RoomController = {
   async createRoom(req, res) {
      const { error } = validateRoom(req.body);

      if (error) {
         return res.status(400).json({ message: formatError(error) });
      }

      if (req.body.maxNum > 4 || req.body.maxNum < 0) {
         return res.status(400).json({ message: "Invalid max number" });
      }

      try {
         const roomBody = req.body;
         const createdRoom = await RoomService.createRoom(roomBody);

         if (createdRoom.pass) {
            return res.status(201).json(createdRoom.newRoom);
         } else {
            return res.status(403).json({
               error: createdRoom.reason,
               code: "Room 생성 실패",
            });
         }
      } catch (error) {
         handleServerError(res, error, "createChat");
      }
   },

   async updateRoom(req, res) {
      const { id } = req.params;
      const isExist = await checkRoomExistence(id);
      if (!(id && isExist)) {
         return res.status(404).json({ message: "Cannot find the room" });
      }

      if (req.body.maxNum > 4 || req.body.maxNum < 0) {
         return res.status(400).json({ message: "Invalid max number" });
      }

      try {
         const roomBody = req.body;
         const updatedRoom = await RoomService.updateRoom(id, roomBody);

         if (updatedRoom.pass) {
            return res.status(200).end();
         } else {
            return res.status(403).json({
               error: updatedRoom.reason,
               code: "Room 수정 실패",
            });
         }
      } catch (error) {
         handleServerError(res, error, "updateRoom");
      }
   },

   async deleteRoom(req, res) {
      const { id } = req.params;
      const isExist = await checkRoomExistence(id);
      if (!(id && isExist)) {
         return res.status(404).json({ message: "Cannot find the room" });
      }

      try {
         const deletedRoom = await RoomService.deleteRoom(id);

         if (deletedRoom.pass) {
            return res.status(204).end();
         } else {
            return res.status(403).json({
               error: deletedRoom.reason,
               code: "Room 삭제 실패",
            });
         }
      } catch (error) {
         handleServerError(res, error, "deleteRoom");
      }
   },
};

export default RoomController;
