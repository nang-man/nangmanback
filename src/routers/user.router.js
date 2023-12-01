import express from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();

// 마이페이지 수정
userRouter.patch("/", loginRequired, UserController.updateUser);

// 유저 프로필이미지 수정

// 유저 프로필이미지 삭제(디폴트이미지로 변경)

// 회원탈퇴

export default userRouter;
