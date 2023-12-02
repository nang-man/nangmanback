import { handleServerError } from "../lib/utils.js";
import AuthService from "../services/auth.service.js";

const AuthController = {
  async createUser(req, res) {
    try {
      const { email, name, phone, password } = req.body;
      const createdUser = await AuthService.createUser(
        email,
        name,
        phone,
        password
      );
      if (createdUser.pass) {
        res.status(201).json(createdUser.newUser);
      } else {
        res.status(403).json({
          error: createdUser.reason,
          code: "회원 가입 실패",
        });
      }
    } catch (error) {
      handleServerError(res, error, "createUser");
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const loggedInUser = await AuthService.loginUser(email, password);
      if (loggedInUser.pass) {
        res.cookie("accessToken", loggedInUser.accessToken, {
          secure: false,
          httpOnly: true,
        });
        res.cookie("refreshToken", loggedInUser.refreshToken, {
          secure: false,
          httpOnly: true,
        });
        const { pass, ...tokens } = loggedInUser;
        res.status(201).json(tokens);
      } else {
        res.status(403).json({
          error: loggedInUser.reason,
          code: "로그인 실패",
        });
      }
    } catch (error) {
      handleServerError(res, error, "loginUser");
    }
  },

  logoutUser(req, res) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "로그아웃 완료" });
    } catch (error) {
      handleServerError(res, error, "logoutUser");
    }
  },

  async accessToken(req, res) {
    try {
      const userToken = req.headers["authorization"]?.split(" ")[1];
      const userData = await AuthService.accessToken(userToken);
      if (userData.pass) {
        const { pass, ...user } = userData;
        res.status(201).json(user);
      } else {
        res.status(403).json({
          error: userData.reason,
          code: "accessToken 확인 실패",
        });
      }
    } catch (error) {
      handleServerError(res, error, "accessToken");
    }
  },

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const newAccessToken = await AuthService.refreshToken(refreshToken);
      if (newAccessToken.pass) {
        const { pass, ...accessToken } = newAccessToken;
        res.status(201).json(accessToken);
      } else {
        res.status(403).json({
          error: newAccessToken.reason,
          code: "refreshToken 확인 실패",
        });
      }
    } catch (error) {
      handleServerError(res, error, "refreshToken");
    }
  },
};

export default AuthController;
