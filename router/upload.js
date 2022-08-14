const express = require('express');
const router = express.Router();
const uploadHandler = require('../router_handler/upload');
const multer = require('multer');
const path = require('path');
const upload = multer({dest:path.join(__dirname, '..', 'uploads')});

router.post('/normal', upload.single('profile'), uploadHandler.uploadNormal);

router.post('/big', upload.single('profile'), uploadHandler.uploadBig);

module.exports = router;