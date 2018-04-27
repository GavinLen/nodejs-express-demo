var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty();
var client = require('../../libs/client');
var reqUtils = require('../../libs/reqUtils');
var constant = require('../../libs/constant');

var server_url = constant.req.url;

router.get('/test', function (req, res, next) {
    reqUtils.getReq(req, res, function (reqData) {
        var data = reqData.data.abc;
        console.log('Req Data:' + JSON.stringify(data));
        var reqUrl = server_url + '/country/nodeReq?str=' + data;
        client.httpGetRequest(reqUrl, function (result) {
            res.render(result)
        });
    });
});

router.get('/', function (req, res, next) {
    reqUtils.getReq(req, res, function (reqData) {
        var data = reqData.data;
        console.log('Req Data:' + JSON.stringify(data));
        var pageNum = data.pageNum;
        var pageSize = data.pageSize;

        if (pageNum <= 0) {
            pageNum = 1;
        }
        if (pageSize <= 0) {
            pageSize = 1;
        }
        var reqUrl = server_url + '/country/page?pageNum=' + pageNum + '&pageSize=' + pageSize;

        // 请求后端代码
        client.httpGetRequest(reqUrl, function (result) {
            var retCode = result.retCode;
            if (constant.res.server_error_code = retCode) {
                res.send(result.data);
            } else {
                console.log('rstMsg:' + result.retMsg);
            }
        });
    });
});

/**
 * 进入 Page 页面
 */
router.get('/list', function (req, res, next) {
    var reqUrl = server_url + '/country/page?pageNum=1&pageSize=5';
    reqUtils.getReq(req, res, function (result) {
        client.httpGetRequest(reqUrl, function (result) {
            var retCode = result.retCode;

            if ('000000' == retCode) {
                res.render('page/', result.data);
            } else {
                console.log('rstMsg:' + result.retMsg);
                res.render('page/', {});
            }

        });
    });
});
module.exports = router;