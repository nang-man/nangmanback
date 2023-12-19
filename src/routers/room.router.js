import express from 'express';
import RoomController from '../controllers/room.controller.js';

const roomRouter = express.Router();

// roomID에 따른 Room 조회
roomRouter.get('/:id', RoomController.readRoomById);
// Room 생성
roomRouter.post('/', RoomController.createRoom);
// Room 수정
roomRouter.patch('/:id', RoomController.updateRoom);
// Room 삭제
roomRouter.delete('/:id', RoomController.deleteRoom);

export default roomRouter;
