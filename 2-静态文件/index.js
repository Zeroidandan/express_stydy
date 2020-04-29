var express = require('express');

var index = express();

// 只需要写一句话，就能够实现静态化文件夹
// 什么叫做静态化呢？？就是能够显示不需要预编译的文件html、js、css、jpg、png
// 说白了，就是这个文件夹中的所有内容都会有自动的路由
index.use(express.static('www'));

index.get('/music', function (req, res) {
    res.send('<h2>我是唱作人</h2>')
});

index.listen(2000);