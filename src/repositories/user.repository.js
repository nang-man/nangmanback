import User from "../models/user.model.js";

const UserRepository = {
  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  },
};

export default UserRepository;
