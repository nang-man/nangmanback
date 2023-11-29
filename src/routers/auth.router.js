import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();

// 회원가입
authRouter.post("/signup", AuthController.createUser);

// 로그인
authRouter.post("/login", AuthController.loginUser);

// 로그아웃

// accessToken 확인

// refreshToken 확인

// 회원탈퇴

export default authRouter;
