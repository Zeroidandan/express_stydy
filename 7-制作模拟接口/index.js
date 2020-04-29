var express = require('express');

var url = require('url');

var fs = require('fs');

var formidable = require('formidable');

var path = require('path');
var mockjs = require('mockjs');

var Random = mockjs.Random;

var index = express();

index.use(express.static('www'));

index.get('/student', function (req, res) {
    // 构建一个数组
    var arr = [];
    // 推入随机生成的10项
    for (var i = 0; i < 10; i++) {
        arr.push({
            'name': Random.cname(),
            'age': Random.integer(18, 25),
            'sex': Random.pick(['男', '女'])
        });
    }
    res.json(arr);
});

index.listen(2700);