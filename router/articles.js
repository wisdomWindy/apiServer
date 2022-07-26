const express = require('express');
const expressjoi = require('@escook/express-joi');
const multer = require('multer');
const path = require('path');
const uploads = multer({dest:path.join(__dirname, '../uploads')});
const {
  add_article_schema,
  get_article_byId_schema,
  delete_article_ById_schema,
  update_article_byId_schema
} = require('../utils/schema');
// 创建路由
const router = express.Router();
const articles = require('../router_handler/articles');

router.post('/addNewArticle', uploads.single('cover_img'), expressjoi(add_article_schema), articles.addNewArticle);
router.post('/getArticles', articles.getArticles);
router.post('/getArticleById', expressjoi(get_article_byId_schema), articles.getArticleById);
router.post('/deleteArticleById', expressjoi(delete_article_ById_schema), articles.deleteArticleById);
router.post('/updateArticleById', expressjoi(update_article_byId_schema), articles.updateArticleById);
module.exports = router;