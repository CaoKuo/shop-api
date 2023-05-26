const { User } = require('../model');
const jwt = require('../utils/jwt');
const { jwtSecret } = require('../config/config.default');

class Auth {
    constructor () {
        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
        this.signout = this.signout.bind(this);
    }

    // 注册
    async signup (req, res, next) {
        try {
            let user = new User(req.body);
            await user.save();

            user = user.toJSON();
            delete user.password;

            res.status(201).json({
                user,
            });
        } catch (error) {
            next(error);
        }
    }

    // 登录
    async signin (req, res, next) {
        try {
            const user = req.user.toJSON();
            const token = await jwt.sign({
                userId: user._id,
            }, jwtSecret, {
                expiresIn: 60 * 60 * 24,
            });
            delete user.password;
            // 写入 cookie
            res.cookie('shop_api_token', `Bearer ${token}`, { expire: new Date() + 9999 });
            res.status(200).json({
                ...user,
                token,
            });
        } catch (error) {
            next(error);
        }
    }

    // 退出登录
    async signout (req, res, next) {
        try {
            console.log(req.cookies);
            res.clearCookie('shop_api_token');
            res.status(200).json({
                message: '退出成功',
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new Auth();
