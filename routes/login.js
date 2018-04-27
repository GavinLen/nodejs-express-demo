/**
 *
 * @type {*|createApplication}
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data = {a:1}
    res.render('login', {
        data: data
    });
});

module.exports = router;
