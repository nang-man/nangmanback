import { validateRoom } from '../models/room.model.js';
import { handleServerError, formatError, checkRoomExistence } from '../lib/utils.js';
import RoomService from '../services/room.service.js';

const RoomController = {
  async readRoom(req, res) {
    try {
      const rooms = await RoomService.readAllRooms();
      if (rooms.pass) {
        res.status(200).json(rooms.rooms);
      } else {
        res.status(404).json({
          error: rooms.reason,
          code: 'Room 정보 조회 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'readRoom');
    }
  },

  async readRoomById(req, res) {
    const { roomId } = req.params;
    if (!id) {
      res.status(404).json({ message: 'Cannot find the room (invalid ID)' });
    }
    try {
      const room = await RoomService.readRoomById(roomId);
      if (room.pass) {
        res.status(200).json(room.room);
      } else {
        res.status(404).json({
          error: room.reason,
          code: 'Room 정보 가져오기 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'readRoom');
    }
  },

  async createRoom(req, res) {
    const { error } = validateRoom(req.body);

    if (error) {
      res.status(400).json({ message: formatError(error) });
      return;
    }

    if (req.body.maxNum > 4 || req.body.maxNum < 0) {
      res.status(400).json({ message: 'Invalid max number' });
      return;
    }

    try {
      const roomBody = req.body;
      const createdRoom = await RoomService.createRoom(roomBody);

      if (createdRoom.pass) {
        res.status(201).json(createdRoom.newRoom);
      } else {
        res.status(403).json({
          error: createdRoom.reason,
          code: 'Room 생성 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'createChat');
    }
  },

  async updateRoom(req, res) {
    const { id } = req.params;
    const isExist = await checkRoomExistence(id);
    if (!(id && isExist)) {
      res.status(404).json({ message: 'Cannot find the room' });
    }

    if (req.body.maxNum > 4 || req.body.maxNum < 0) {
      res.status(400).json({ message: 'Invalid max number' });
    }

    try {
      const roomBody = req.body;
      const updatedRoom = await RoomService.updateRoom(id, roomBody);

      if (updatedRoom.pass) {
        res.status(200).end();
      } else {
        res.status(403).json({
          error: updatedRoom.reason,
          code: 'Room 수정 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'updateRoom');
    }
  },

  async deleteRoom(req, res) {
    const { id } = req.params;
    const isExist = await checkRoomExistence(id);
    if (!(id && isExist)) {
      res.status(404).json({ message: 'Cannot find the room' });
    }

    try {
      const deletedRoom = await RoomService.deleteRoom(id);

      if (deletedRoom.pass) {
        res.status(204).end();
      } else {
        res.status(403).json({
          error: deletedRoom.reason,
          code: 'Room 삭제 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'deleteRoom');
    }
  },
};

export default RoomController;
