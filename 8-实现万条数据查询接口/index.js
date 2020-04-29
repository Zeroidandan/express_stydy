var express = require('express');
// url模块是内置模块，不需要装依赖，用来拆解URL的
var url = require('url');
// formidable是用来处理POST请求的
var formidable = require('formidable');
// 引入fs模块，写文件
var fs = require('fs');
// 内置了一个模块
var path = require('path');


// 连接数据库，代码不用背，https://www.npmjs.com/package/mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect();


// 创建app
var app = express();

// 只需要写一句话，就能够实现静态化文件夹
// 什么叫做静态化呢？？就是能够显示不需要预编译的文件html、js、css、jpg、png
// 说白了，就是这个文件夹中的所有内容都会有自动的路由
app.use(express.static('www'));

app.get('/students', function (req, res) {
    // 得到各种GET请求参数
    var sex = url.parse(req.url, true).query.sex;
    var blood = url.parse(req.url, true).query.blood;
    var ethnic = url.parse(req.url, true).query.ethnic;
    var page = url.parse(req.url, true).query.page;
    var star = url.parse(req.url, true).query.star;

    // 拼接一个SQL查询
    var chaxun = [];

    // 如果用户GET请求中有sex
    if (sex) {
        chaxun.push('sex = "' + sex + '"');
    }

    // 如果用户GET请求中有ethnic
    if (ethnic) {
        // 拆分
        var ethnic_arr = ethnic.split('v');
        var temp = [];
        // 遍历
        for (var i = 0; i < ethnic_arr.length; i++) {
            temp.push('ethnic = "' + ethnic_arr[i] + '"');
        }
        chaxun.push('(' + temp.join(' OR ') + ')');
    }

    // 如果用户GET请求中有blood
    if (blood) {
        // 拆分
        var blood_arr = blood.split('v');
        var temp = [];
        // 遍历
        for (var i = 0; i < blood_arr.length; i++) {
            temp.push('blood = "' + blood_arr[i] + '"');
        }
        chaxun.push('(' + temp.join(' OR ') + ')');
    }

    // 如果用户GET请求中有star
    if (star) {
        // 拆分
        var star_arr = star.split('v');
        var temp = [];
        // 遍历
        for (var i = 0; i < star_arr.length; i++) {
            temp.push('star = "' + star_arr[i] + '"');
        }
        chaxun.push('(' + temp.join(' OR ') + ')');
    }

    // 如果用户至少有一个查询参数
    if (chaxun.length != 0) {
        // 拼接SQL的查询语法
        var chaxun_str = ' WHERE ' + chaxun.join(' AND ');
    } else {
        // 如果用户没有查询参数，就留空
        var chaxun_str = '';
    }

    var sql = 'SELECT * FROM student' + chaxun_str + ' ORDER BY id ASC LIMIT ' + (page - 1) * 10 + ', 10';
    // console.log(sql);

    // 执行查询
    connection.query({
        sql: sql,
    }, function (error, results, fields) {
        res.json(results);
    });
});

// 监听3000端口
app.listen(2800);