const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

// POST /auth/join
exports.join = async (req, res, next) => {
  const { nick, email, password } = req.body;
  try {
    // 이메일이 있는지 확인
    const exUser = await User.findOne({ where: { email } });
    // 이메일이 있는 경우
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    // 이메일이 없는 경우
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// POST /auth/login
exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // 서버 실패
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    // 로직 실패
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    // 로그인 성공
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  // { } 브라우저 connect.sid가 남아있어도
  req.logout(() => {
    res.redirect("/");
  });
};
