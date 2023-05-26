const express = require('express');

const router = express.Router();

// 登录注册相关
router.use(require('./auth'));

module.exports = router;
