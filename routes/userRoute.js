const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const route = express.Router();

route.post('/signup', authController.signup);
route.post('/login', authController.login);
route.post('/forgotPassword', authController.forgotPassword);
route.patch('/resetPassword/:token', authController.resetPassword);
route.route('/').get(userController.getAllUser).post(userController.createUser);
route
  .route('/:id?')
  .get(userController.getUser)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = route;
