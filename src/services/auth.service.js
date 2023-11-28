import { hashedPassword } from "../lib/utils.js";
import User from "../models/user.model.js";

const AuthService = {
  async createUser(signUpData) {
    try {
      const { email, name, phone, password } = signUpData;
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
      return { newUser, pass: true };
    } catch (error) {
      console.log(error);
    }
  },
};

export default AuthService;
