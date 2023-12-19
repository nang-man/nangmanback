import sha256 from 'sha256';
import jwt from 'jsonwebtoken';
import Room from '../models/room.model.js';
import Chat from '../models/chat.model.js';

export const handleServerError = (res, error, methodName) => {
  console.log(error);
  res.status(500).json({
    error: `AuthController.${methodName} server error : ${error.message}`,
  });
};

export const hashedPassword = (password) => sha256(password);

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
    expiresIn: process.env.ACCESS_EXPIRES_IN,
    issuer: 'Nang_Man',
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
    issuer: 'Nang_Man',
  });
};

export const decodeAccessToken = (accessToken) => {
  return jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
};

export const decodeRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
};

export const formatError = (error) => {
  return error.details[0].message.replace(/"/g, '');
};

export const checkRoomExistence = async (id) => {
  try {
    const isRoom = await Room.findById(id);
    if (isRoom) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const checkChatExistence = async (id) => {
  try {
    const isChat = await Chat.findById(id);
    if (isChat) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
