import User from '../models/user.model.js';

const UserService = {
  async readAllUsers() {
    try {
      const users = await User.find();
      return { pass: true, users };
    } catch (error) {
      console.log(error);
      return { pass: false, reason: error };
    }
  },
  async readUser(id) {
    try {
      const user = await User.findById(id);
      if (user) {
        return { pass: true, user };
      } else {
        return { pass: false, reason: 'Not found' };
      }
    } catch (error) {
      console.log(error);
      return { pass: false, reason: error };
    }
  },

  async updateUser(userOId, { name, phone, profileImg }) {
    try {
      const updatedUser = await User.updateOne({ userOId }, { name, phone, profileImg });
      if (!name && !phone && !profileImg) {
        return { pass: false, reason: '수정할 내용이 없습니다.' };
      }
      return { pass: true, updatedUser };
    } catch (error) {
      console.log(error);
    }
  },

  async updatePassword(id, password) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return { pass: false, reason: 'UserNotFound' };
      }
      user.password = password;
      await user.save();
      return { pass: true };
    } catch (error) {
      console.log(error);
      return { pass: false, reason: 'Error in updatePassword' };
    }
  },
};

export default UserService;
