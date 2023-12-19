import { validateChat } from '../models/chat.model.js';
import { handleServerError, formatError, checkChatExistence, checkRoomExistence } from '../lib/utils.js';
import ChatService from '../services/chat.service.js';

const ChatController = {
  async readChats(req, res) {
    const { roomId } = req.params;
    const isExist = await checkRoomExistence(roomId);

    if (!(roomId && isExist)) {
      res.status(404).json({ message: 'Cannot find the room' });
    }
    try {
      const chats = await ChatService.readChats(roomId);
      res.status(200).send(chats);
    } catch (error) {
      handleServerError(res, error, 'readChats');
    }
  },

  async createChat(req, res) {
    const { error } = validateChat(req.body);

    if (error) {
      res.status(400).json({ message: formatError(error) });
    }

    try {
      const chatBody = req.body;
      const createdChat = await ChatService.createChat(chatBody);

      if (createdChat.pass) {
        res.status(201).json(createdChat.newChat);
      } else {
        res.status(403).json({
          error: createdChat.reason,
          code: 'Chat 생성 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'createChat');
    }
  },

  async deleteChat(req, res) {
    const { id } = req.params;
    const isExist = await checkChatExistence(id);
    if (!(id && isExist)) {
      res.status(404).json({ message: 'Cannot find the chat' });
    }

    try {
      const deletedChat = await ChatService.deleteChat(id);

      if (deletedChat.pass) {
        res.status(204).end();
      } else {
        res.status(403).json({
          error: deletedChat.reason,
          code: 'Chat 삭제 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'deleteChat');
    }
  },
};

export default ChatController;
