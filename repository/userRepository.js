const Sequelize = require('sequelize');
const db = require('../db/mysqlDb');
const uuidV4 = require('uuid/v4');

// create model
var User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuId:{
        type: Sequelize.STRING(100)
    },
    gender: Sequelize.BOOLEAN,
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'user_name' // db name
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
    email: {
        type: Sequelize.STRING
    },
    create_at_test: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    version: Sequelize.BIGINT,
    commit: Sequelize.TEXT
}, {
    // Sequelize 會自動在 table 名稱後加 s，如果不想要 Sequelize 亂動 table 名稱就設為 false
    freezeTableName: false,
    // Sequelize 會自動加上 createAt 和 updateAt，並自動帶上系統時間
    timestamps: true
});

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var user = User.sync({ force: false });

module.exports = {
    GetItems : function(){
        // 測試連線
        // db.authenticate()
        // .then(() => {
        //     console.log('Connection has been established successfully.');
        // })
        // .catch(err => {
        //     console.error('Unable to connect to the database:', err);
        // });

        return User.findAll()
        .then(function (data) {
            return JSON.stringify(data);
        }).catch(function (err) {
            console.log('failed: ' + err);
        });
    },
    GetItem : function(id){
        return User.findById(id)
        //.findOne({ where: { id: id } }) //這行也行
        .then(function (data) {
            return JSON.stringify(data);
        }).catch(function (err) {
            console.log('failed: ' + err);
        });
    },
    DeleteItemById : function(id){ //FIXME: 刪除不存在 會當作成功
        return User.destroy({
            where: {
              id: id
            }
        })
        .catch(function (err) {
            console.error('failed: ' + err);
            throw Error('failed: ' + err);
        });
    },
    CreateItem: function(gender, userName, email, version, commit){
        return User.create({
            uuId: uuidV4(),
            gender: gender,
            userName: userName,
            email: email,
            create_at: Date.now(),
            version: version,
            commit: commit
        })
        .catch(function (err) {
            console.error('failed: ' + err);
            throw Error('failed: ' + err);
        });
    },
    UpdateItem: function(id, userName){ //FIXME: 更新不存在 會當作成功
        return User.update( 
            { userName: userName }, 
            { where: { id: id }}
        )
        .catch(function (err) {
            console.error('failed: ' + err);
            throw Error('failed: ' + err);
        });
    }
  };