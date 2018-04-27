/**
 * Created by hbyan on 2017/1/13.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('11111111');
    var err = {
        title: 'error',
        status: '404'
    };
    res.render('error', err);
});

module.exports = router;