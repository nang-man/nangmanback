import { Server } from 'socket.io';

let io;

export const initializeSocketIo = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  return io;
};

export const socketHandler = (io, socket) => {
  console.log('User connected: ' + socket.id);

  // Description: A basic handshake function
  socket.on('handshake', (message) => {
    console.log('Handshake server: ', message);
    socket.emit('handshake', { message: 'Hello this is server' });
  });

  // Description: Let the user join a certain chat room
  // @param data {roomId, name}
  // @return object {message}
  socket.on('joinChatRoom', (data) => {
    console.log('joinChatRoom event is triggered');
    const { roomId, name } = data;
    socket.join(roomId);
    io.to(roomId).emit('joinChatRoom', {
      message: `${name} joined the room.`,
    });
  });

  // Description: Send the message from the user in the same chat room
  // @param data {roomId, name, message}
  // @return object {user, message}
  socket.on('sendMessage', (data, callback) => {
    console.log('sendMessage event is triggered');
    const { roomId, name, message, time } = data;
    socket.broadcast.to(roomId).emit('sendMessage', { user: name, message: message });
    callback({ message: message, name: name, time: time });
  });

  // Description: Let the user leave the chat room
  // @param data {roomId, name}
  // @return object {message}
  socket.on('leaveChatRoom', (data) => {
    const { roomId, name } = data;
    socket.emit('leaveChatRoom', { message: `${name} left the room.` });
    socket.leave(roomId);
  });

  // Description: Let the user join a certain voice room
  // @param data {roomId, name}
  // @return object {message}
  // TODO: Check if it is a right implementation for this feature.
  socket.on('joinVoiceRoom', (data) => {
    const { roomId, name } = data;
    socket.join(roomId);
    socket.to(roomId).emit('joinVoiceRoom', {
      message: `${name}: joined the voice room.`,
    });
  });

  // Description: Handle with a disconnection event
  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
};
