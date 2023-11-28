import AuthService from "../services/auth.service.js";

const AuthController = {
  async createUser(req, res) {
    try {
      const { email, name, phone, password } = req.body;
      const signUpData = {
        email,
        name,
        phone,
        password,
      };
      const createdUser = await AuthService.createUser(signUpData);
      if (createdUser.pass) {
        res.status(201).json({ "계정 생성 성공": createdUser.newUser });
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
};

export default AuthController;
