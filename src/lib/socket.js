import { Server } from "socket.io";

let io;

export const initializeSocketIo = (server) => {
   io = new Server(server, {
      cors: {
         origin: process.env.ORIGIN || "http://localhost:5173",
         methods: ["GET", "POST"],
         credentials: true,
      },
   });
   return io;
};
