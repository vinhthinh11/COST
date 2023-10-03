const express = require('express');
const userProductController = require('../controllers/userProductController');

const router = express.Router();

//rote under here is for Admin
router
  .route('/:id')
  .get(userProductController.findUser)
  .patch(userProductController.updateUser)
  .delete(userProductController.deleteUser);

router
  .route('/')
  .post(userProductController.addUser)
  .get(userProductController.getAllUsers);

module.exports = router;
