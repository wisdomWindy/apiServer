// 引入express框架
const express = require('express');
const expressjoi = require('@escook/express-joi');
const {
  add_article_cate_schema,
  delete_article_cate_schema,
  get_article_cate_byId_schema,
  update_article_cate_byId_schema
} = require('../utils/schema');
// 创建路由
const router = express.Router();
const article = require('../router_handler/article_cate');

router.post('/getArticleCate', article.getArticleCate);
router.post('/addArticleCate', expressjoi(add_article_cate_schema), article.addArticleCate);
router.post('/deleteArticleCate', expressjoi(delete_article_cate_schema), article.deleteArticleCate);
router.post('/getArticleCateById', expressjoi(get_article_cate_byId_schema), article.getArticleCateById);
router.post('/updateArticleCateById', expressjoi(update_article_cate_byId_schema), article.updateArticleCateById);
module.exports = router