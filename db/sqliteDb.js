const Sequelize = require('sequelize');
const config = require('../config/sqliteConfig');

module.exports = new Sequelize({
    dialect: 'sqlite',
    pool: {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 30000// 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    // SQLite only
    storage: config.storagePath
});