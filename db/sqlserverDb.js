const Sequelize = require('sequelize');
const config = require('../config/sqlserverConfig');

module.exports  = new Sequelize({
    dialect: 'mssql',
    dialectModulePath: 'sequelize-msnodesqlv8',
    dialectOptions: {
        connectionString: config.connectionString
    },
    // dialectOptions: {
    //   driver: 'SQL Server Native Client 10.0',
    //   instanceName: 'SQLEXPRESS',
    //   trustedConnection: true
    // },
    //host: 'localhost',
    //database: 'database',
    pool: {
      min: 0,
      max: 5,
      idle: 10000
    }
  });