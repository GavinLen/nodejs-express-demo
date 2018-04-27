var http = require('http');
var https = require('https');
var url = require('url');

function httpGetRequest (request_url, callback) {
    var option = url.parse(request_url);
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
    req.setTimeout(1000, function () {
        req.abort();
        callback({});
        return;
    });
    req.on('error', function (e) {
        callback(e);
    });
    req.end();
}

var client_2 = function () {
    this.get = httpGetRequest;
    this.reqGet = function (request_url, callback) {
        var option = url.parse(request_url);
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
        req.setTimeout(1000, function () {
            req.abort();
            callback({});
            return;
        });
        req.on('error', function (e) {
            callback(e);
        });
        req.end();
    };
};
module.exports = client_2;