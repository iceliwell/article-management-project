// 创建模型
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleType = {
  title: String,
  content: String,
  time: Number,
  username: String,
};
const ArticleModel = mongoose.model("articles", new Schema(ArticleType));
module.exports = ArticleModel;
