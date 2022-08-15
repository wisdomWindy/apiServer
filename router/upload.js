const express = require('express');
const router = express.Router();
const uploadHandler = require('../router_handler/upload');

router.post('/normal', uploadHandler.uploadNormal);
router.post('/uploadBase64', uploadHandler.uploadBase64);
router.post('/big', uploadHandler.uploadBig);

module.exports = router;