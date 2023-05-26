const { validationResult, buildCheckFunction } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const { errMessageHandler } = require('./error-handler');

exports = module.exports = validations => {
    return async (req, res, next) => {
        for (const validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ error: errMessageHandler(errors) });
    };
};

exports.isValidObjectId = (location, fields) => {
    return buildCheckFunction(location)(fields).custom(async value => {
        if (!isValidObjectId(value)) {
            return Promise.reject(new Error('ID 不是一个有效的 objectID'));
        }
    });
};
