module.exports = {
    dbUri: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    jwtSecret: process.env.JWT_SECRET,
};
