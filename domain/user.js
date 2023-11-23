const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const loggedUserId = req.user.userId;
    const foundUser = await User.findById(loggedUserId);
    if (!foundUser) {
      return res.status(409).json({ errors: ["User not found"] });
    }

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { getUser };
