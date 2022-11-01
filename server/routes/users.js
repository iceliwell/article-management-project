var express = require("express");
var router = express.Router();
const UsersModel = require("../model/UsersModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 注册接口
router.post("/regist", (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  UsersModel.create({
    username,
    password,
    passwordConfirmation,
  }).then((data) => {
    console.log(data);
    if (data) {
      res.redirect("/login");
    } else {
      console.log("注册失败");
    }
  });
});

// 登录接口
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // 数据库中查找
  UsersModel.find({ username: username, password: password }).then((data) => {
    if (data.length > 0) {
      // 登录成功，进行session会话存储
      req.session.username = username;
      // 找到，去首页
      res.redirect("/");
    } else {
      // 没找到，去注册login
      res.redirect("/regist");
    }
  });
});

// 退出登录
router.get("/logout", (req, res) => {
  req.session.username = null;
  res.redirect("/login");
});

module.exports = router;
