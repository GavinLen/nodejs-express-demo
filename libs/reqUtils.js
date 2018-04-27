var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var constant = require('./constant');

var reqData = {
    data: null
}

/**
 * GIT 请求
 * @param req
 * @param res
 * @param callback
 */
var getReq = function (req, res, callback) {
    var data = req.query;
    var reqData = {
        data: data
    };
    callback(reqData);
};

/**
 * POST 请求
 * @param req
 * @param res
 * @param callback
 */
var postReq = function (req, res, callback) {
    var data = req.body;
    var reqData = {
        data: data
    };
    callback(reqData);
};

/**
 * 多组件 POST 请求
 * @param req
 * @param res
 * @param callback
 */
var postMultipartyReq = function (req, res, callback) {
    var data = req.body;
    var tempFilePath = req.files;
    var reqData = {
        data: data,
        tempFilePath: tempFilePath
    };
    callback(reqData);
};

/**
 * XML 数据的 POST 请求
 * @param req
 * @param res
 * @param callback
 */
var postXmlReq = function (req, res, callback) {
    var rawBody = '';
    var dataJson = {};
    req.on('data', function (chunk) {
        rawBody += chunk;
    });
    req.on('end', function () {
        parseString(rawBody, function (error, data) {
            var reqData = {
                data: data
            };
            callback(reqData);
        })
    });
};

var reqUtils = {
    reqData: reqData,
    getReq: getReq,
    postReq: postReq,
    postMultipartyReq: postMultipartyReq,
    postXmlReq: postXmlReq
};

module.exports = reqUtils;