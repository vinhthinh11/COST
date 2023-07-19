const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
route.route('/').get(userController.getAllUser).post(userController.createUser);
route
  .route('/:id?')
  .get(userController.getUser)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = route;
