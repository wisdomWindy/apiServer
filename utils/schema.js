const Joi = require('joi');
const username = Joi.string().alphanum().min(1).max(10).required();
const password = Joi.string().pattern(/^[\S]{6,12}$/).required();
const id = Joi.number().integer().min(1).required();
const email = Joi.string().email().required();
const nickname = Joi.string().required();
const avatar = Joi.string().dataUri().required();
const name = Joi.string().required();
const alias = Joi.string().alphanum().required();

const title = Joi.string().required();
const cate_id = Joi.number().integer().min(1).required();
const content = Joi.string().required().allow('');
const state = Joi.string().valid('已发布', '草稿').required();

// 注册登录验证规则
exports.reg_login_schema = {
  body: {
    username,
    password
  }
};

// 更新用户信息验证规则
exports.update_userInfo_schema = {
  body: {
    id,
    email,
    nickname
  }
}

// 重置密码验证规则
exports.reset_password_schema = {
  body: {
    id,
    oldpassword: password,
    newpassword: Joi.not(Joi.ref('oldpassword')).concat(password)
  }
}

// 更细头像
exports.update_avatar_schema = {
  body:{
    id,
    avatar
  }
}

// 添加文章分类校验规则
exports.add_article_cate_schema = {
  body:{
    name,
    alias
  }
} 

// 删除文章分类校验规则
exports.delete_article_cate_schema = {
  body:{
    id
  }
}

// 根据id获取文章分类校验规则
exports.get_article_cate_byId_schema = {
  body:{
    id
  }
}

// 根据id更新文章分类
exports.update_article_cate_byId_schema = {
  body:{
    id,
    name,
    alias
  }
}

// // 发布新文章
exports.add_article_schema = {
  body:{
    title,
    state,
    content,
    cate_id,
    author_id:cate_id
  }
}

// 根据文章id获取文章
exports.get_article_byId_schema = {
  body:{
    id
  }
}

// 根据文章id删除文章
exports.delete_article_ById_schema = {
  id
}

exports.update_article_byId_schema = {
  id,
  title: Joi.string(),
  state: Joi.string().valid('已发布', '草稿'),
  content: Joi.string().allow(''),
  cate_id: Joi.number().integer().min(1),
  author_id: Joi.number().integer().min(1)
}