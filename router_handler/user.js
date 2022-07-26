const db = require('../db');
const md5 = require('md5');
const config = require('../config');
const jwt = require('jsonwebtoken');
exports.register = (req, res) => {
  const userInfo = req.body;
  db.query('SELECT * FROM env_users WHERE username=?', userInfo.username, (err, results) => {
    console.log(results);
    if (err) {
      return res.cc(400, err);
    }
    if (results.length > 0) {
      res.cc(103, '用户名被占用请更换其他用户名');
    } else {
      userInfo.password = md5(userInfo.password);
      db.query(`INSERT INTO env_users (username, password) VALUES ('${userInfo.username}','${userInfo.password}')`, (err, results) => {
        if (err) {
          return res.cc(400, err);
        }
        if (results.affectedRows === 1) {
          console.log(results);
          res.cc(200, '注册成功');
        } else {
          res.cc(103, results.message);
        }
      });
    }
  });
}

exports.login = (req, res) => {
  let userInfo = req.body;
  userInfo.password = md5(userInfo.password);
   db.query(`SELECT * from env_users where username='${userInfo.username}' and password='${userInfo.password}'`, (err, results) => {
     if (err) {
       return res.cc(400, err);
     }
     if (results.length > 0) {
       let user = {...results[0], password:'', user_pic:''};
       let token = jwt.sign(user, config.apisecret, {
         expiresIn:config.expiresIn
       });
      res.send({code:200, message:'登陆成功', token:token});
     } else {
       res.cc(400, '登陆失败');
     }
   });
}