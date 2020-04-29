var express = require('express');
// url模块是内置模块，不需要装依赖，用来拆解URL的
var url = require('url');
// formidable是用来处理POST请求的
var  formidable = require('formidable');
// 引入fs模块，写文件
var fs = require('fs');

var index = express();

index.use(express.static('www'));

index.post('/tijiao',function(req,res){
    // 手册中
    var form = formidable({ multiples: true });
    // fields参数就是HTTP的报文体中的信息
    form.parse(req, (err, fields, files) => {
        // 追加文件
        fs.appendFile('./存储.txt',`
        [姓名]${fields.name}
        [性别]${fields.sex}
        [年龄]${fields.age}
        ******************************
        `,function(){
            // 回调函数
            res.send('<h1>已接收到您的表单</h1>');
        });
    });
});

index.listen(2500);