var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty();
var client = require('../../libs/client');
var client_2 = require('../../libs/client_2');
var reqUtils = require('../../libs/reqUtils');

/**
 * POST 请求 XML 格式的数据
 */
router.post('/xml', function (req, res, next) {
    reqUtils.postXmlReq(req, res, function (result) {
        res.send(result)
    })
});

/**
 * POST 请求 多组件数据
 */
router.post('/upload', multipartMiddleware, function (req, res, next) {
    reqUtils.postMultipartyReq(req, res, function (result) {
        var data = result.data;
        var tempFilePath = result.tempFilePath;
        console.log('Data:' + data + '; TempFilePath:' + tempFilePath);
        res.send({
            data: data,
            filePath: tempFilePath
        });
    });
});

router.post('/post', function (req, res, next) {
    reqUtils.postReq(req, res, function (result) {
        console.log(result.data);
        res.send(result);
    });
});

router.get('/getTest', function (req, res, next) {
    reqUtils.getReq(req, res, function (result) {
        console.log(result.data);
        res.send(result);
    });
});



router.get('/', function (req, res, next) {
    var c = new client_2();
    var req_url = 'http://localhost:8080/country/page?pageNum=2&pageSize=5';
    c.reqGet(req_url, function (error, body) {
        var data = JSON.parse(body.toString());
        console.log('end:' + JSON.stringify(data));
        res.render('page/', {data: data.list})
    });
    // client.httpGetRequest(req_url, function (error, body) {
    //     var data = JSON.parse(body.toString());
    //     console.log('end:' + JSON.stringify(data));
    //     res.render('page/', {data: data.list})
    // });

});
module.exports = router;