var mockjs = require('mockjs');
var Random = mockjs.Random;

// 连接数据库，代码不用背，https://www.npmjs.com/package/mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect();


// 计数器
var count = 0;

// 封装一个函数
function insert() {
    // 执行一次insert就计数器加1
    count++;
    console.log('正在插入' + count);
    // 如果次数够了，就结束，如果不写结束语句就会死循环了
    if (count == 30000) {
        console.log('已经全部插入完毕');
        return;
    }
    
    var post = { 
        name: Random.cname(), 
        age: Random.integer(10, 30), 
        sex: Random.pick(['男', '女']),
        blood: Random.pick(['A', 'B', 'O', 'AB', '熊猫']),
        star: Random.pick(['白羊座', '双鱼座', '处女座', '巨蟹座']),
        ethnic: Random.pick(['汉族', '满足', '回族', '维吾尔族', '土家族', '苗族'])
    };

    connection.query('INSERT INTO student SET ?', post, function (error, results, fields) {
        // 插入完一条数据之后的回调，继续插入新的数据，这样的就是同步的了，
        // 一条接一条插入，不要用for循环套
        insert();
    });
}
insert();