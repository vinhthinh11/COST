const express = require('express');
const multer = require('multer'); // handler image
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const updload = multer({ dest: 'public/img/users/' });
const router = express.Router();
// these routes under are for user controllers
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logOut);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.get(
  '/getMe',
  authController.protect,
  userController.getMe, //middleware chuyen id cua user sang cho req.params.id
  userController.getUser
);
router.patch(
  '/updateMe',
  authController.protect,
  updload.single('photo'), // upate cho file photo
  userController.removeBodyPassword, //middleware remove password va chuyen id sang cho req.params.id
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, userController.deleteMe);
//rote under here is for Admin
router
  .route('/')
  .get(
    // authController.protect,
    // authController.restrict('admin'),
    userController.getAllUser
  )
  .post(userController.createUser);
router
  .use('/:id', authController.protect, authController.restrict('admin'))
  .get(userController.getUser)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
