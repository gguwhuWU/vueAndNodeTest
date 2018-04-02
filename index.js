var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var routes = require('./routes/index');
var users = require('./routes/users');
var dbTest = require('./routes/dbTest');

//設定靜態檔案所在目錄
app.use(express.static(__dirname + '/public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'))
app.use('/vue', express.static(__dirname + '/node_modules/vue/dist/'))
app.use('/toastr', express.static(__dirname + '/node_modules/toastr/build/'))
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist/'))
app.use('/axios-mock-adapter', express.static(__dirname + '/node_modules/axios-mock-adapter/dist/'))
app.use('/vee-validate', express.static(__dirname + '/node_modules/vee-validate/dist/'))
app.use('/vuetify', express.static(__dirname + '/node_modules/vuetify/dist/'))
app.use('/vue-route', express.static(__dirname + '/node_modules/vue-route/src/'))


//將html網頁交給ejs模組來處理
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//設定路由
app.use('/', routes);
app.use('/users', users);
app.use('/dbTest', dbTest);

// port號
app.listen(3000);

module.exports = app;