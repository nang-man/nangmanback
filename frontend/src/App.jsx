import { useState, useEffect } from "react";
import io from "socket.io-client";

function App() {
   const [socket, setSocket] = useState(null);
   const [message, setMessage] = useState("");

   const updateMessage = (data) => {
      setMessage(data["message"]);
      console.log(data);
   };

   useEffect(() => {
      const newSocket = io("http://localhost:3000");

      newSocket.on("handshake", updateMessage);
      newSocket.on("joinChatRoom", updateMessage);
      newSocket.on("leaveChatRoom", updateMessage);
      newSocket.on("sendMessage", updateMessage);
      newSocket.on("disconnect", updateMessage);

      setSocket(newSocket);

      return () => {
         newSocket.disconnect();
      };
   }, []);

   const handshake = () => {
      socket.emit("handshake", "Hello this is client");
   };

   const joinChatRoom = () => {
      socket.emit("joinChatRoom", { name: socket.id, roomId: "Test" });
   };

   const leaveRoom = () => {
      socket.emit("leaveChatRoom", {
         name: socket.id,
         roomId: "Test",
      });
   };

   const sendMessage = () => {
      console.log(socket);
      socket.emit(
         "sendMessage",
         {
            name: socket.id,
            roomId: "Test",
            message: `The user ${socket.id} sent the message from client`,
         },
         (message) => {
            updateMessage(message);
         }
      );
   };

   const disconnect = () => {
      socket.emit("disconnect", { message: "The connection is closed" });
   };

   return (
      <>
         <div>Fake frontend</div>
         <div>Response: {message}</div>
         <button onClick={handshake}>Send handshake</button>
         <button onClick={joinChatRoom}>Join the room</button>
         <button onClick={leaveRoom}>leave the room</button>
         <button onClick={sendMessage}>Send the message</button>
         <button onClick={disconnect}>Disconnect</button>
      </>
   );
}

export default App;
