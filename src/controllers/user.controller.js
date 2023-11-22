const UserController = {
  apitest(req, res) {
    try {
      const test = "apitest";
      res.status(200).send(test);
    } catch (error) {
      res.status(500).json({
        error: `apitest server error : ${error.message}`,
      });
    }
  },
};

export default UserController;
