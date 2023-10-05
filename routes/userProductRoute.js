const express = require('express');
const userProductController = require('../controllers/userProductController');
const authController = require('../controllers/authController');

const router = express.Router();

//rote under here is for Admin
router
  .route('/:id')
  .get(userProductController.findUser)
  .delete(userProductController.deleteUser);

router
  .route('/')
  .post(userProductController.addUser)
  .get(userProductController.getAllUsers)
  .patch(
    authController.protect,
    userProductController.uploadUserPhoto,
    userProductController.resizeUserPhoto,
    userProductController.removeBodyPassword,
    userProductController.updateMe
  );

module.exports = router;
