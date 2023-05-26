const util = require('util');

exports = module.exports = () => {
    return (err, req, res, next) => {
        res.status(500).json({
            error: util.format(err),
        });
    };
};

exports.errMessageHandler = errors => {
    const ret = JSON.parse(JSON.stringify(errors));
    let message;
    for (const errorName in ret.errors) {
        if (ret.errors[errorName].msg) {
            message = ret.errors[errorName].msg;
        }
    }
    return message;
};
