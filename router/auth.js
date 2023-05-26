const express = require('express');
const Auth = require('../controller/auth');
const authValidator = require('../validator/auth');

const router = express.Router();

// 用户注册
router.post('/signup', authValidator.signup, Auth.signup);

// 用户登录
router.post('/signin', authValidator.signin, Auth.signin);

// 退出登录
router.get('/signout', Auth.signout);

module.exports = router;
