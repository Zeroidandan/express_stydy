var express = require('express');
// url模块是内置模块，不需要装依赖，用来拆解URL的
var url = require('url');
// formidable是用来处理POST请求的
var  formidable = require('formidable');
// 引入fs模块，写文件
var fs = require('fs');
// 内置了一个模块
var path = require('path');

var index = express();

index.use(express.static('www'));

index.post('/tijiao',function(req,res){
    // 手册中
    var form = formidable({ 
        // 图片的上传路径，这个路径必须写成绝对路径形式
        // path.resolve()方法可以将两个路径合并起来，__dirname表示当前文件夹的路径，uploads是文件夹的名字。即，这条代码的意思是，将图片上传到uploads文件夹中。
        uploadDir: path.resolve(__dirname, 'uploads'),
        // 保留上传的图片的扩展名
        keepExtensions: true
    });
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

index.listen(2600);