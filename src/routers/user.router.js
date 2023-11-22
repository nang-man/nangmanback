import express from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", UserController.apitest);

export default userRouter;
