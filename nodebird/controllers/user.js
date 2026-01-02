const User = require("../models/user");

exports.follow = async (req, res, next) => {
  // req.user.id (나), req.params.id (팔로우할 대상)
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).send("사용자가 존재하지 않습니다.");
    }
    await user.addFollowing(parseInt(req.params.id, 10));
    res.send("success");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
