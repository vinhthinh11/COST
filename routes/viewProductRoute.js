const express = require('express');
const viewProductController = require('../controllers/viewProductController');
const authController = require('../controllers/authController');

const router = express.Router();

//  lay trang san pham va in ra cho
router.use(authController.isLoggedIn);
router.get('/:id', viewProductController.getProductDetail);
router.get('/', viewProductController.getProductPage);
// lay form de them san pham
router.get('/addProduct', viewProductController.getAddProductPage);
router.get('/update/:id', viewProductController.getUpdateProductPage);
// lay form de them review cho san pham
router.get('/reviews', viewProductController.getAddProductPage);

router.use(authController.protect, authController.restrict('admin'));
router.get('/manageProducts', viewProductController.manageProducts);
router.get('/manageUsers', viewProductController.manageUsers);
router.get('/manageReviews', viewProductController.manageReviews);
router.get('/manageOrders', viewProductController.manageOrders);

module.exports = router;
