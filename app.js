// 引入express框架
const express = require('express');

// 跨域依赖
const cors = require('cors');

// token生成依赖
const expressJWT = require('express-jwt');

// 数据校验依赖
const Joi = require('joi');


// 引入router 模块
const userRouter = require('./router/user');
const userInfoRouter = require('./router/userInfo');
const articleRouter = require('./router/article_cate');
const articlesRouter = require('./router/articles');
const uploadRouter = require('./router/upload');

// 配置文件
const config = require('./config');

// 创建app实例
const app = express();

// 跨域处理
app.use(cors());

// 解析application/x-www-form-urlencoded格式的数据
app.use(express.urlencoded({
  extended: false
}));

// 静态资源托管
app.use('/uploads', express.static('./uploads'));

// 注册错误处理中间件
app.use(function (req, res, next) {
  res.cc = function (err, code) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err
    });
  }
  next();
});

// token验证中间件
app.use(expressJWT({
  secret: config.apisecret
}).unless({
  path: [/\/(api|upload)/ig]
}));

// 注册路由
app.use('/api', userRouter);
app.use('/userInfo', userInfoRouter);
app.use('/article', articleRouter);
app.use('/articles', articlesRouter);
app.use('/upload', uploadRouter);

// 全局错误处理
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    return res.cc(err);
  }
  if (err.name === 'UnauthorizedError') return res.cc(err);
  res.cc(err);
});

// 监听请求
app.listen(8090, () => {
  console.log('apiServer runing at http://127.0.0.1:8090');
});