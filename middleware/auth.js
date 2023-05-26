const { verify } = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.default');
const { errMessageHandler } = require('./error-handler');
const { User } = require('../model');

module.exports = async (req, res, next) => {
    let token = req.cookies && req.cookies.shop_api_token;
    token = token ? token.split('Bearer ')[1] : null;

    if (!token) {
        res.status(401).send({
            error: '验证失败，请重新登录',
        });
    }

    try {
        const decodedToken = await verify(token, jwtSecret);
        req.user = await User.findById(decodedToken.userId);
        next();
    } catch (error) {
        res.status(401).send({
            error: errMessageHandler(error),
        });
    }
};
