const Product = require('../Models/productSchema');
const User = require('../Models/userProductSchema');
const Review = require('../Models/reviewProductSchema');
const Order = require('../Models/orderSchema');

const AppError = require('../utils/AppError');

exports.getProductPage = async (req, res, next) => {
  // tim tat ca cac booking cua current use
  const products = await Product.find();
  if (products.length <= 0) return next(new AppError(400, 'No products found'));
  // 3> co tours render cac tour ra
  return res.status(200).render('product_page', {
    title: 'Chào mừng bạn đến với của hàng nông sản',
    products,
  });
};
exports.manageProducts = async (req, res, next) => {
  const products = await Product.find();
  if (products.length <= 0)
    return next(new AppError(400, 'Can not find products'));
  return res.status(200).render('./manage_admin/manageProducts', {
    title: 'Quản lý sản phẩm',
    products,
  });
};
exports.manageUsers = async (req, res, next) => {
  const users = await User.find();
  if (users.length <= 0) return next(new AppError(400, 'Chưa có user nao ca'));
  return res.status(200).render('./manage_admin/manageUsers', {
    title: 'Quản lý người dùng',
    users,
  });
};
exports.manageReviews = async (req, res, next) => {
  const reviews = await Review.find();
  if (reviews.length <= 0) return next(new AppError(400, 'Chưa có review'));
  // 3> co tours render cac tour ra
  return res.status(200).render('./manage_admin/manageReviews', {
    title: 'Quản lý bình luận',
    reviews,
  });
};
exports.manageOrders = async (req, res, next) => {
  const orders = await Order.find();
  if (orders.length <= 0) return next(new AppError(400, 'Chưa có order'));
  return res.status(200).render('./manage_admin/manageOrders', {
    title: 'Quản lý đơn hàng',
    orders,
  });
};
exports.getProductDetail = async (req, res, next) => {
  if (/^a|^m|^u/.test(req.params.id)) return next();
  const product = await Product.findById(req.params.id);
  const reviews = await Review.find({ product: product.id });
  if (!product) return next(new AppError(400, 'Sản phẩm không tồn tại'));
  return res.status(200).render('product_detail', {
    product,
    reviews,
    title: `Chi tiết ${product.name}`,
  });
};
exports.getAddProductPage = async (req, res, next) =>
  res.status(200).render('./manage_admin/addNewProducts', {
    title: `Trang thêm sản phẩm`,
  });
exports.getUpdateProductPage = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return new AppError(404, 'Product not found');
  res.status(200).render('./manage_admin/addNewProducts', {
    title: `Chỉnh sửa sản phẩm`,
    product,
  });
};
