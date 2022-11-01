// 创建模型
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersType = {
  username: String,
  password: String,
  passwordConfirmation: String,
};
const UsersModel = mongoose.model("users", new Schema(UsersType));
module.exports = UsersModel;
