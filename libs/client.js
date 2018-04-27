var http = require('http');
var https = require('https');
var url = require('url');

var result = {
    rstCode: null,
    rstMsg: null,
    data: null
};

function httpGetRequest(request_url, callback) {
    var option = url.parse(request_url);
    option.method = 'GET';
    var req = http.request(option, function (res) {
        var body = new Buffer(0);
        var buffer = [];
        res.on('data', function (chuck) {
            body = Buffer.concat([body, chuck]);
        });
        res.on('end', function () {
            result = {
                retCode: '000000',
                retMsg: 'success',
                data: JSON.parse(body.toString())
            };
            callback(result);
        });
    });
    req.setTimeout(1000, function () {
        req.abort();
        result = {
            retCode: '300100',
            retMsg: 'Req Time Out',
            data: {}
        };
        callback(result);
        return;
    });
    req.on('error', function (e) {
        result = {
            retCode: '600100',
            retMsg: 'Req Error',
            data: {}
        };
        callback(result);
    });
    req.end();
}

var client = {
    httpGetRequest: httpGetRequest,
    result: result
};

module.exports = client;