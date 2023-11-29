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
      console.log(error);
      res.status(500).json({
        error: `AuthController.createUser server error : ${error.message}`,
      });
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
        const { pass, ...rest } = loggedInUser;
        res.status(201).json(rest);
      } else {
        res.status(403).json({
          error: loggedInUser.reason,
          code: "로그인 실패",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `AuthController.loginUser server error : ${error.message}`,
      });
    }
  },
};

export default AuthController;
