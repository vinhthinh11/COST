const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const route = express.Router();
// these routes under are for user controllers
route.post('/signup', authController.signup);
route.post('/login', authController.login);
route.post('/forgotPassword', authController.forgotPassword);
route.patch('/resetPassword/:token', authController.resetPassword);
route.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
route.patch('/updateMe', authController.protect, userController.updateMe);
route.delete('/deleteMe', authController.protect, userController.deleteMe);
//rote under herr is for Admin
route
  .route('/')
  .get(
    // authController.protect,
    // authController.restrict('admin'),
    userController.getAllUser
  )
  .post(userController.createUser);
route
  .route('/:id?')
  .get(userController.getUser)
  .post(userController.createUser)
  .patch(authController.protect, userController.updateUser)
  .delete(userController.deleteUser);
module.exports = route;
