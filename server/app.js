
// 加载express模块
var express = require('express');
// 加载数据库管理模块
var mongoose = require('mongoose');
// 加载body-parser用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 加载cookies模块
//var Cookies = require('cookies');

var cookieParser = require('cookie-parser');
// 创建app应用
var app = express();
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



//在原有的基础上加上下面代码即可
//app.use(cookieParser('singedMyCookie'));




// 配置cookies
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.cookie('haha','shoudao')
  	next();
});

app.use(function(req,res,next){
	console.log(req.cookies.haha);
	next();
});

app.use('/blogger/', require('./routes/main'));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog",{ useMongoClient: true }, function (err) {
    if (err) {
        console.log("数据库连接失败");
    } else {
        console.log("数据库连接成功");
        app.listen(8081, function () {
            console.log('app is listening on port 8081.');
        })
    }
});

module.exports = app;