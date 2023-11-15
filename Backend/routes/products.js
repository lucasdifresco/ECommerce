/**ROUTE PRODUCT APIs. */
var express = require('express')

var router = express.Router()
var products = require('./api/product.route')

router.use('/', products);

module.exports = router;
