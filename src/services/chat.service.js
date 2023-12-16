import Chat from "../models/chat.model.js";

const ChatService = {
   async createChat(body) {
      try {
         const newChat = new Chat(body);
         await newChat.save();
         return { pass: true, newChat };
      } catch (error) {
         return { pass: false, reason: "Invalid Body" };
      }
   },
};

export default ChatService;
