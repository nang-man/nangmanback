import User from "../models/user.model.js";

const UserService = {
  async updateUser(userOId, { name, phone, profileImg }) {
    try {
      const updatedUser = await User.updateOne(
        { userOId },
        { name, phone, profileImg }
      );
      if (!name && !phone && !profileImg) {
        return { pass: false, reason: "수정할 내용이 없습니다." };
      }
      return { pass: true, updatedUser };
    } catch (error) {
      console.log(error);
    }
  },
};

export default UserService;
