var express = require("express");
var router = express.Router();
const ArticleModel = require("../model/ArticleModel");

/* GET article listing. */
// 新增 / 编辑
router.post("/add", (req, res) => {
  var time = req.body.id;
  if (time) {
    // 编辑
    var page = req.body.page;
    var title = req.body.title;
    var content = req.body.content;
    ArticleModel.updateOne(
      { time: time },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    )
      .then((data) => {
        console.log("修改成功", data);
        res.redirect("/?page=" + page);
      })
      .catch((err) => {
        console.log("修改失败", err);
      });
  } else {
    // 新增
    const { title, content } = req.body;
    var time = Date.now();
    var username = req.session.username;
    ArticleModel.create({
      title,
      content,
      time,
      username,
    })
      .then((data) => {
        console.log(data);
        res.redirect("/");
      })
      .catch((err) => {
        console.log("文件发布失败", err);
        res.redirect("/write");
      });
  }
});

// 删除文章
router.get("/delete", (req, res) => {
  var time = req.query.id;
  var page = req.query.page;
  ArticleModel.deleteOne({ time: time })
    .then(() => {
      console.log("删除成功");
      res.redirect("/?page=" + page);
    })
    .catch((err) => console.log("删除失败", err));
});

module.exports = router;
