var express = require('express');

var index = express();

// 罗列路由中间件
// 当用户用GET请求访问/路径的时候，
index.get('/', function (req, res) {
    // send是新的函数，可以自动调整UTF8字符集，但是只能发送一条。和end类似。
    res.send('<h1>首页banner</h1>');
});

index.get('/news', function (req, res) {
    res.send('<h1>新闻事务</h1>');
});

index.listen(2000);