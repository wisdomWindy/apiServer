// 引入express框架
const express = require('express');

// 创建路由
const router = express.Router();

// 用户路由处理函数
const userHandler = require('../router_handler/user');


const expressjoi = require('@escook/express-joi');

// 引入校验规则
const {
  reg_login_schema
} = require('../utils/schema');


// 注册用户
router.post('/register', expressjoi(reg_login_schema), userHandler.register);

// 登录
router.post('/login', expressjoi(reg_login_schema), userHandler.login);


module.exports = router;