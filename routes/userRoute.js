const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();
// these routes under are for user controllers
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);
//rote under herr is for Admin
router
  .route('/')
  .get(
    // authController.protect,
    // authController.restrict('admin'),
    userController.getAllUser
  )
  .post(userController.createUser);
router
  .route('/:id?')
  .get(userController.getUser)
  .post(userController.createUser)
  .patch(authController.protect, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
