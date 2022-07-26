// 引入express框架
const express = require('express');

// 引入userRouter 模块
const userRouter = require('./router/user');
const userInfoRouter = require('./router/userInfo');
const articleRouter = require('./router/article_cate');
const articlesRouter = require('./router/articles');
// 配置跨域访问
const cors = require('cors');

// 数据校验
const Joi = require('joi');

// 配置文件
const config = require('./config');

const expressJWT = require('express-jwt');

// 创建app实例
const app = express();

app.use(cors());

// 解析application/x-www-form-urlencoded格式的数据
app.use(express.urlencoded({
  extended: false
}));
app.use('/uploads', express.static('./uploads'));
app.use(function (req, res, next) {
  res.cc = function (err, code) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err
    });
  }
  next();
});

app.use(expressJWT({
  secret: config.apisecret
}).unless({
  path: [/\/api/]
}));

// 注册user路由
app.use('/api', userRouter);
// 注册userInfo路由
app.use('/userInfo', userInfoRouter);
app.use('/article', articleRouter);
app.use('/articles', articlesRouter);

// 全局错误处理
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    return res.cc(err);
  }
  if (err.name === 'UnauthorizedError') return res.cc(err);
  res.cc(err);
});

// 监听请求
app.listen(9090, () => {
  console.log('apiServer runing at http://127.0.0.1:9090');
});