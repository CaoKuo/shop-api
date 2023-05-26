const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router');
const errorHandler = require('./middleware/error-handler');
require('./model');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors());

const PORT = process.env.APP_PORT || 5000;

app.use('/api', router);

// 挂载统一处理服务端异常中间件
app.use(errorHandler());

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
