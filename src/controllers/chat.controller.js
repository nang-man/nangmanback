import { validateChat } from "../models/chat.model.js";
import { handleServerError, formatError } from "../lib/utils.js";
import ChatService from "../services/chat.service.js";

const ChatController = {
   async createChat(req, res) {
      const { error } = validateChat(req.body);

      if (error) {
         return res.status(400).json({ message: formatError(error) });
      }

      try {
         const chatBody = req.body;
         const createdChat = await ChatService.createChat(chatBody);

         if (createdChat.pass) {
            res.status(201).json(createdChat.newChat);
         } else {
            res.status(403).json({
               error: createdChat.reason,
               code: "Chat 생성 실패",
            });
         }
      } catch (error) {
         handleServerError(res, error, "createChat");
      }
   },
};

export default ChatController;
