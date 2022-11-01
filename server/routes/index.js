var express = require("express");
var router = express.Router();
var ArticleModel = require("../model/ArticleModel");
var moment = require("moment"); // 转成时间格式

/* GET home page. */
router.get("/", function (req, res, next) {
  var username = req.session.username || "";
  var page = req.query.page || 1;
  console.log(req.query);
  var pageInfo = {
    total: 0, // 总共多少页
    curPage: page,
    articleList: [], // 当前页的文章列表
    pageSize: 3,
  };
  // 1.查询所有
  ArticleModel.find().then((data) => {
    // console.log(data);
    pageInfo.total = Math.ceil(data.length / pageInfo.pageSize);
    // 2.分页查询
    ArticleModel.find()
      .sort({ _id: -1 })
      .limit(pageInfo.pageSize)
      .skip((page - 1) * pageInfo.pageSize)
      .then((pageData) => {
        if (pageData.length === 0) {
          res.redirect("/?page=" + (page - 1 || 1));
        } else {
          pageData.map((item) => {
            item["creatTime"] = moment(item.time).format("YYYY-MM-DD HH:MM:SS");
          });
          pageInfo.articleList = pageData;
        }
        res.render("index", { username: username, pageInfo: pageInfo });
      });
  });
});

// 渲染注册页
router.get("/regist", (req, res) => {
  res.render("regist", {});
});

// 渲染登录页
router.get("/login", (req, res) => {
  res.render("login", {});
});

// 渲染写文章页 / 编辑文章页
router.get("/write", (req, res) => {
  var username = req.session.username || "未定义用户名";
  var id = req.query.id;
  var page = req.query.page;
  var item = {
    title: "",
    content: "",
  };
  if (id) {
    // 编辑
    ArticleModel.findOne({ time: id }).then((data) => {
      console.log(data);
      item = data;
      item["page"] = page;
      res.render("write", { username: username, item: item });
    });
  } else {
    // 新增
    res.render("write", { username: username, item: item });
  }
});

// 渲染详情页
router.get("/detail", (req, res) => {
  var username = req.session.username || "未定义用户名";
  var time = req.query.id;
  ArticleModel.findOne({ time: time })
    .then((data) => {
      console.log("查询成功", data);
      data["creatTime"] = moment(data.time).format("YYYY-MM-DD HH:MM:SS");
      res.render("detail", { username: username, item: data });
    })
    .catch((err) => {
      console.log("查询失败", err);
    });
});

module.exports = router;
