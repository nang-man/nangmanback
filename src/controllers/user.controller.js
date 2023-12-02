import { handleServerError } from "../lib/utils.js";
import UserService from "../services/user.service.js";

const UserController = {
  async updateUser(req, res) {
    try {
      const { userOId } = req._id;
      const { name, phone, profileImg } = req.body;
      const updatedUser = await UserService.updateUser(userOId, {
        name,
        phone,
        profileImg,
      });
      if (updatedUser.pass) {
        res.status(201).json(updatedUser);
      } else {
        res.status(403).json({
          error: updatedUser.reason,
          code: "마이페이지 수정 실패",
        });
      }
    } catch (error) {
      handleServerError(res, error, "updateUser");
    }
  },
};

export default UserController;
