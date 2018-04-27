var http = require('http');
var https = require('https');
var url = require('url');

var reqConfig = {
    requestTimeout: 10000
};

var errorObject = {
    signatureError: {
        code: 1,
        message: '返回数据的签名不正确'
    },
    sessionCreateError: {
        code: 2,
        message: '创建会话时出错'
    },
    requestTimeoutError: {
        code: 3,
        message: '请求时超时'
    }
};

/**
 * 向后台服务发起GET请求
 * @param req_url
 * @param data
 * @param req_timeout
 * @param callback
 */
function http_get(req_url, data, req_timeout, callback) {
    var option = url.parse(req_url);
    option.method = 'GET';
    var req = http.request(option, function (res) {
        var body = new Buffer(0);
        var buffer = [];
        res.on('data', function (chuck) {
            body = Buffer.concat([body, chuck]);
        });
        res.on('end', function () {
            callback(null, body);
        });
    });
    req.setTimeout(reqConfig.requestTimeout, function () {
        req.abort();
        debug('请求超时');
        callback(errorObject.requestTimeoutError);
        return;
    });
    req.on('error', function (e) {
        callback(e);
    });
    req.end();
};
var client_utils = function (req_url, data, callback) {

};

module.exports = client_utils;