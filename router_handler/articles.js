const db = require("../db");
const path = require('path');
const e = require("express");
const formidable = require('formidable');
// 发布新文章
exports.addNewArticle = function (req, res) {
  let form = new formidable.IncomingForm({ multiples: true, uploadDir: path.join(__dirname, '..', 'uploads'), keepExtensions: true });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
      return;
    }
    let data = req.body;
    let file = files[cover_img];
    let cover_img = path.join(__dirname, '../uploads/', file.newFilename);
    let pub_date = new Date();
    if (!file || file.fieldname !== 'cover_img') return res.cc(400, '文章封面为必选参数');
    let sql = `INSERT INTO env_articles (title, state, pub_date, content, cover_img, cate_id, author_id) VALUES 
  ('${data.title}', '${data.state}', '${pub_date}', '${data.content}', '${cover_img}', ${data.cate_id}, ${data.author_id})`;
    db.query(sql, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows) {
        res.send({
          code: 200,
          message: '发布文章成功'
        });
      } else {
        res.cc(400, '发布文章失败');
      }
    });
  });
}

// 获取文章列表
exports.getArticles = function (req, res) {
  db.query(`SELECT * from env_articles`, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 200,
      message: '查询成功',
      data: results
    });
  });
}

// 根据id获取文章信息
exports.getArticleById = function (req, res) {
  let data = req.body;
  db.query(`SELECT * from env_articles WHERE id=${data.id}`, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 200,
      message: '查询成功',
      data: results
    });
  });
}

// 根据文章id删除文章
exports.deleteArticleById = function (req, res) {
  let data = req.body;
  db.query(`SELECT * from env_articles WHERE id=${data.id}`, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      db.query(`UPDATE env_articles SET is_delete=1 WHERE id=${data.id}`, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows) {
          res.send({
            code: 200,
            message: '删除成功'
          });
        } else {
          res.cc(400, '删除失败');
        }
      });
    } else {
      res.cc(400, '该文章不存在');
    }
  });
}

// 根据文章id更新文章
exports.updateArticleById = function (req, res) {
  let data = req.body;
  let file = req.file;
  
  let fieldName = [];
  for (let key in data) {
    if(key === 'id'){
      continue;
    }
    fieldName.push(`${key}='${data[key]}'`);
  }
  if (file && file.fieldname === 'cover_img') {
    let cover_img = path.join(__dirname, '../uploads/', file.filename);
    fieldName.push('cover_img=' + cover_img);
  }
  db.query(`SELECT * from env_articles WHERE id=${data.id}`, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      db.query(`UPDATE env_articles SET ${fieldName.join(',')} WHERE id=${data.id}`, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows) {
          res.send({
            code: 200,
            message: '更新文章成功'
          });
        } else {
          res.cc(400, '更新文章失败');
        }
      });
    } else {
      res.cc(400, '该文章不存在');
    }
  });
}