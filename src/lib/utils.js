import sha256 from "sha256";
import jwt from "jsonwebtoken";

export const hashedPassword = (password) => sha256(password);

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
    expiresIn: process.env.ACCESS_EXPIRES_IN,
    issuer: "Nang_Man",
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
    issuer: "Nang_Man",
  });
};
