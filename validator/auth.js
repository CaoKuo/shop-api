const { body } = require('express-validator');
const { User } = require('../model');
const validate = require('../middleware/valiadate');
const md5 = require('../utils/md5');

const signup = validate([
    body('name').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
    body('email')
        .notEmpty().withMessage('邮箱不能为空')
        .bail() // 如果上面已经出现错误则停止执行下面的代码
        .isEmail().withMessage('邮箱格式不正确')
        .bail()
        .custom(async email => { // 自定义校验规则
            const user = await User.findOne({ email });
            if (user) {
                return Promise.reject(new Error('邮箱已存在'));
            }
        }),
]);

const signin = [
    validate([
        body('email').notEmpty().withMessage('邮箱不能为空'),
        body('password').notEmpty().withMessage('密码不能为空'),
    ]),
    validate([
        body('email').custom(async (email, { req }) => {
            const user = await User.findOne({ email })
                .select(['name', 'email', 'password', 'role']);
            if (!user) {
                return Promise.reject(new Error('用户不存咋'));
            }

            req.user = user;
        }),
    ]),
    validate([
        body('password').custom(async (password, { req }) => {
            console.log('password===', password, req.user.password);
            if (md5(password) !== req.user.password) {
                return Promise.reject(new Error('密码错误'));
            }
        }),
    ]),
];

module.exports = {
    signup,
    signin,
};
