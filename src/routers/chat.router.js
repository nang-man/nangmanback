import express from "express";
import ChatController from "../controllers/chat.controller.js";

const chatRouter = express.Router();

// Chat 생성
chatRouter.post("/", ChatController.createChat);

export default chatRouter;
