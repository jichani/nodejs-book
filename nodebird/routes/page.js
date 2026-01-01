const express = require("express");
const router = express.Router();
const {
  renderJoin,
  renderProfile,
  renderMain,
} = require("../controllers/page.js");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;
