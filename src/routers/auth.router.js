import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();

// 회원가입
authRouter.post("/signup", AuthController.createUser);

// 로그인
authRouter.post("/login", AuthController.loginUser);

// 로그아웃
authRouter.post("/logout", AuthController.logoutUser);

// accessToken 확인
authRouter.get("/accessToken", AuthController.accessToken);

// refreshToken 확인 후 accessToken갱신
authRouter.post("/refreshToken", AuthController.refreshToken);

export default authRouter;
