var express = require('express');

// url模块是内置模块，不需要装依赖，用来拆解URL的
var url = require('url');

var index = express();

index.use(express.static('mmm'));

index.get('/showget',function(req,res){
    // 得到GET请求的参数a。url.parse()函数可以拆解URL，加上true参数表示把参数变为对象的形式
    var a = url.parse(req.url,true).query.a;
    var b = url.parse(req.url,true).query.b;
    var c = url.parse(req.url,true).query.c;

    res.send(`<h2>a参数是${a}，b参数是${b},c参数是${c}</h2>`);
});

index.listen(2400);