const db = require('../db');
const md5 = require('md5');

// 获取用户信息
exports.getUserInfo = function (req, res) {
  const userInfo = req.user;
  db.query(`SELECT * from env_users where id=${userInfo.id}`, (err, results) => {
    if (results.length > 0) {
      delete results[0].password;
      res.send({
        code: 200,
        message: '查询成功',
        data: results[0]
      });
    } else {
      res.cc(400, '获取用户信息失败');
    }
  });
}

// 更新用户信息
exports.updateUserInfo = function (req, res) {
  const updateData = req.body;
  console.log(updateData);
  db.query(`UPDATE env_users SET nickname='${updateData.nickname}',email='${updateData.email}' WHERE id=${updateData.id}`, (err, results) => {
    if (err) return res.cc(400, err);
    if (results.affectedRows === 1) {
      res.send({
        code: 200,
        message: '用户信息更新成功'
      });
    } else {
      res.cc(400, '用户信息更新失败');
    }
  });
}

// 重置密码
exports.resetPassword = function (req, res) {
  const resetData = req.body;
  resetData.newpassword = md5(resetData.newpassword);
  db.query(`SELECT * from env_users WHERE id=${resetData.id}`, (err, results) => {
    if(err) return res.cc(400, err);
    if(results.length){
      if (results[0].password === md5(resetData.oldpassword)) {
        db.query(`UPDATE env_users SET password='${resetData.newpassword}' WHERE id=${resetData.id}`, (err, results) => {
          if (err) return res.cc(400, err);
          if (results.affectedRows === 1) {
            res.send({
              code: 200,
              message: '重置密码成功'
            });
          } else {
            res.cc(400, '重置密码失败');
          }
        });
      } else {
        res.cc(400, '旧密码错误');
      }
    } else {
      res.cc(400, '用户不存在');
    }
  });
}

// 更新用户头像
exports.updateAvatar = function (req,res){
  const data = req.body;
  db.query(`SELECT * from env_users WHERE id=${data.id}`, (err, results) => {
    if(err) return res.cc(err);
    if(results.length){
      db.query(`UPDATE env_users SET avatar='${data.avatar}' WHERE id=${data.id}`, (err,results) => {
        if(err) return res.cc(err);
        if(results.length){
          res.send({code:200, message:'更新头像成功'});
        } else {
          res.cc(400, '更新头像失败');
        }
      });
    } else {
      res.cc(400, '该用户不存在');
    }
  });
}