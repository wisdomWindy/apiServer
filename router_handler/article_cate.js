const db = require("../db")

exports.getArticleCate = function (req, res) {
  db.query(`SELECT * from env_articles_cate WHERE is_delete=0 order by id asc`, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 200,
      message: '查询成功',
      data: results
    });
  });
}

// 添加文章分类
exports.addArticleCate = function (req, res) {
  let data = req.body;
  db.query(`SELECT * from env_articles_cate WHERE name='${data.name}' or alias='${data.alias}'`, (err, results) => {
    if (err) return res.cc(400, err);
    if (results.length) {
      res.send({
        code: 103,
        message: 'name或alias被占用，请更换后重试'
      });
    } else {
      db.query(`INSERT INTO env_articles_cate (name, alias) VALUES ('${data.name}','${data.alias}')`, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows === 1) {
          res.cc(200, '添加文章分类成功');
        } else {
          res.cc(400, '添加文章分类失败');
        }
      });
    }
  });
}

// 删除文章分类
exports.deleteArticleCate = function (req, res) {
  let data = req.body;
  db.query(`SELECT * from env_articles_cate WHERE id=${data.id}`, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      db.query(`UPDATE env_articles_cate set is_delete=1 WHERE id=${data.id}`, (err, results) => {
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
      res.cc(400, '该文章分类不存在');
    }
  });
}

// 根据id获取文章分类
exports.getArticleCateById = function (req, res) {
  let data = req.body;
  db.query(`SELECT * from env_articles_cate WHERE id=${data.id}`, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 200,
      message: '查询成功',
      data: results
    });
  });
}

// 根据id更新文章分类
exports.updateArticleCateById = function (req, res) {
  let data = req.body;
  db.query(`SELECT * from env_articles_cate WHERE id<>${data.id} and name='${data.name}' or alias='${data.alias}'`, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      res.cc(103, '文章分类name或alias被占用,请更换后重试');
    } else {
      db.query(`SELECT * from env_articles_cate WHERE id=${data.id}`, (err, results) => {
        if (err) return res.cc(err);
        if (results.length) {
          db.query(`UPDATE env_articles_cate SET name='${data.name}', alias='${data.alias}' WHERE id=${data.id}`, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows) {
              res.send({
                code: 200,
                message: '更新成功'
              });
            } else {
              res.cc(400, '更新失败');
            }
          });
        } else {
          res.cc(400, '该文章分类不存在');
        }
      });
    }
  });
}

