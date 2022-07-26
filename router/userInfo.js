const express = require('express');
const router= express.Router();
const userInfo = require('../router_handler/userInfo');
const expressjoi = require('@escook/express-joi');
const {update_userInfo_schema,reset_password_schema,update_avatar_schema} = require('../utils/schema');
router.post('/getUserInfo', userInfo.getUserInfo);
router.post('/updateUserInfo', expressjoi(update_userInfo_schema), userInfo.updateUserInfo);
router.post('/resetPassword', expressjoi(reset_password_schema), userInfo.resetPassword);
router.post('/updateAvatar', expressjoi(update_avatar_schema), userInfo.updateAvatar);
module.exports = router