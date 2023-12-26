import express from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import UserController from '../controllers/user.controller.js';

const userRouter = express.Router();

// 모든 유저 읽어오기
userRouter.get('/', UserController.readUsers);

// 특정 유저 읽어오기
userRouter.get('/:id', UserController.readUser);

// 마이페이지 수정
userRouter.patch('/:id', UserController.updateUser);

// 패스워드 수정
userRouter.patch('/:id/password', UserController.updatePassword);

// 유저 프로필이미지 수정

// 유저 프로필이미지 삭제(디폴트이미지로 변경)

// 회원탈퇴

export default userRouter;
