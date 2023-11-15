/**ROUTE ORDERS APIs. */
var express = require('express')

var router = express.Router()
var orders = require('./api/order.route')

router.use('/', orders);

module.exports = router;
