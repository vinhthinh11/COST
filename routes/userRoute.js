const express = require('express');
const userController = require('../controllers/userController');

const route = express.Router();

route.route('/').get(userController.getAllUser).post(userController.createUser);
route
  .route('/:id?')
  .get(userController.getUser)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = route;
