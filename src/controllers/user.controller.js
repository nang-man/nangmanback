import { handleServerError, hashedPassword } from '../lib/utils.js';
import UserService from '../services/user.service.js';

const UserController = {
  async readUsers(req, res) {
    try {
      const users = await UserService.readAllUsers();
      if (users.pass) {
        res.status(200).json(users.users);
      } else {
        res.status(404).json({
          error: users.reason,
        });
      }
    } catch (error) {
      handleServerError(res, error, 'readUsers');
    }
  },

  async readUser(req, res) {
    try {
      const { id } = req.params;
      const readUser = await UserService.readUser(id);
      if (readUser.pass) {
        res.status(200).json(readUser.user);
      } else {
        res.status(404).json({
          error: readUser.reason,
        });
      }
    } catch (error) {
      handleServerError(res, error, 'readUser');
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, phone, profileImg } = req.body;
      const updatedUser = await UserService.updateUser(id, {
        name,
        phone,
        profileImg,
      });
      if (updatedUser.pass) {
        res.status(201).json(updatedUser);
      } else {
        res.status(403).json({
          error: updatedUser.reason,
          code: '유저 정보 업데이트 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'updateUser');
    }
  },

  async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        res.status(401).json({
          error: 'Invalid password',
          code: '유저 패스워드 업데이트 실패',
        });
      }

      const newPassword = hashedPassword(password);

      const updatePassword = await UserService.updatePassword(id, newPassword);

      if (updatePassword.pass) {
        res.status(200).end();
      } else {
        res.status(403).json({
          error: updatePassword.reason,
          code: 'password 수정 실패',
        });
      }
    } catch (error) {
      handleServerError(res, error, 'updatePassword');
    }
  },
};

export default UserController;
