const express = require('express');
const userProductController = require('../controllers/userProductController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

//rote under here is for Admin
router
  .route('/')
  .get(userProductController.getUser)
  .post(userProductController.addUser)
  .patch(
    authController.protect,
    userProductController.uploadUserPhoto,
    userProductController.resizeUserPhoto,
    userProductController.removeBodyPassword,
    userProductController.updateMe
  );

module.exports = router;
