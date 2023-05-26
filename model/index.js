const mongoose = require('mongoose');
const { dbUri } = require('../config/config.default');

async function main () {
    console.log('dburl===', dbUri);
    await mongoose.connect(dbUri);
    console.log('数据库连接成功');
}

main().catch((err) => {
    console.log('MongoDB 数据库连接失败', err);
});

module.exports = {
    User: mongoose.model('User', require('./user')),
};
