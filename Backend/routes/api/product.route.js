var express = require('express')
var router = express.Router();
var authorization = require('../../auth/authorization');
var adminAuthorization = require('../../auth/adminAuthorization');
var ProductsController = require('../../controllers/products.controller');
var ImgUploaderController = require('../../controllers/imgUploader.controller');


// Get Products
router.get('/', ProductsController.getProducts);
router.get('/id', ProductsController.getProduct);
router.put('/update', authorization, ProductsController.updateStock);

router.post('/img', adminAuthorization, ImgUploaderController.uploadFiles);
router.post('/cloud', adminAuthorization, ImgUploaderController.uploadToCloud);

router.post('/add', adminAuthorization, ProductsController.createProduct);
router.put('/modify', adminAuthorization, ProductsController.updateProduct);
router.delete('/remove', adminAuthorization, ProductsController.removeProduct);

// Export the Router
module.exports = router;