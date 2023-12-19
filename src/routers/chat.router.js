import express from 'express';
import ChatController from '../controllers/chat.controller.js';

const chatRouter = express.Router();

// roomID에 따른 Chat 조회
chatRouter.get('/:roomId', ChatController.readChats);
// Chat 삭제
chatRouter.delete('/:id', ChatController.deleteChat);
// Chat 생성
chatRouter.post('/', ChatController.createChat);

export default chatRouter;
