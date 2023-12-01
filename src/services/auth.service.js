import {
  decodeAccessToken,
  decodeRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  hashedPassword,
} from "../lib/utils.js";
import User from "../models/user.model.js";

const AuthService = {
  async createUser(email, name, phone, password) {
    try {
      if (password.length < 8) {
        return { pass: false, reason: "비밀번호가 8자리 미만입니다." };
      }
      const userData = {
        email,
        name,
        phone,
        password: hashedPassword(password),
      };
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return { pass: false, reason: "이미 존재하는 이메일입니다." };
      }
      const newUser = new User(userData);
      await newUser.save();
      return { pass: true, newUser };
    } catch (error) {
      console.log(error);
    }
  },

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (user && user.email) {
        const isPasswordMatched = (password) => {
          return hashedPassword(password) === user.password;
        };
        const payload = {
          userOId: user._id,
          userId: user.userId,
          email: user.email,
          name: user.name,
          adminState: user.adminState,
        };
        if (isPasswordMatched(password)) {
          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);
          return {
            pass: true,
            user,
            accessToken,
            refreshToken,
          };
        } else {
          return { pass: false, reason: "비밀번호가 일치하지 않습니다." };
        }
      } else {
        return { pass: false, reason: "회원가입이 필요합니다." };
      }
    } catch (error) {
      console.log(error);
    }
  },

  async accessToken(userToken) {
    try {
      const decodedToken = decodeAccessToken(userToken);
      const userEmail = decodedToken.email;
      const decodedUser = await User.findOne({ email: userEmail });
      if (decodedUser) {
        return { pass: true, decodedUser };
      } else {
        return {
          pass: false,
          reason: "해당 토큰의 유저정보가 일치하지 않습니다.",
        };
      }
    } catch (error) {
      console.log(error);
    }
  },

  async refreshToken(refreshToken) {
    try {
      const decodedRefreshToken = decodeRefreshToken(refreshToken);
      const { iat, exp, iss, ...payload } = decodedRefreshToken;
      const accessToken = generateAccessToken(payload);
      if (accessToken) {
        return {
          pass: true,
          accessToken,
        };
      } else {
        return {
          pass: false,
          reason: "access토큰 재발급 실패, 유효하지 않은 refresh토큰",
        };
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default AuthService;
