var express = require('express')
var router = express.Router()
var authorization = require('../../auth/authorization');
var adminAuthorization = require('../../auth/adminAuthorization');
var OrdersController = require('../../controllers/orders.controller');


// Get Orders
router.post('/', authorization, OrdersController.getOrders);
router.post('/id', authorization, OrdersController.getOrder);
router.post('/all', adminAuthorization, OrdersController.getAllOrders);
// Create Orders
router.post('/add', authorization, OrdersController.createOrder);

// Update Orders
router.put('/modify', adminAuthorization, OrdersController.updateOrder);

// Export the Router
module.exports = router;