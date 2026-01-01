const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // user === exUser
    // user id만 추출
    done(null, user.id);
  });
  // 세션 { 1232132333: 1 } {세션쿠키: 유저아이디} -> 메모리에 저장됨.

  passport.deserializeUser((id, done) => {
    // id: 1
    User.findOne({ where: { id } })
      .then((user) => done(null, user)) // req.user, req.session
      .catch((err) => done(err));
  });

  local();
  kakao();
};
