var config = require('./config');
var mysql = require('mysql');
var pool = require('generic-pool').Pool;
var mysqlPool = new pool({
    name: '',
    create: function (callback) {
        var connection = mysql.createConnection({
            host: config.mySql.host,
            user: config.mySql.username,
            password: config.mySql.password,
            database: config.mySql.database
        });
        callback(null, connection);
    },
    // 销毁连接
    destroy: function (client) {
        client.end();
    },
    min: 2,// 最小连接数
    max: 5,// 最大连接数
    idleTimeoutMillis: config.mySql.timeOut,// 超时时间
    log: true// //是否显示日志

});
module.exports = mysqlPool;