import Chat from '../models/chat.model.js';

const ChatService = {
  async readChats(room) {
    try {
      const chats = await Chat.find({ room: room });
      return { pass: true, chats };
    } catch (error) {
      return { pass: false, reason: 'Invalid RoomId' };
    }
  },

  async createChat(body) {
    try {
      const newChat = new Chat(body);
      await newChat.save();
      return { pass: true, newChat };
    } catch (error) {
      return { pass: false, reason: error };
    }
  },
  async deleteChat(id) {
    try {
      const deletedChat = await Chat.deleteOne({ _id: id });
      if (!deletedChat) {
        return { pass: false, reason: 'Error with deleting the chat' };
      }
      return { pass: true };
    } catch (error) {
      return { pass: false, reason: error };
    }
  },
};

export default ChatService;
