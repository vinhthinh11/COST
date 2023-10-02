const Product = require('../Models/productSchema');
const AppError = require('../utils/AppError');

exports.getProductPage = async (req, res, next) => {
  // tim tat ca cac booking cua current use
  const products = await Product.find();
  if (products.length <= 0)
    return next(new AppError(400, 'Chua co san pham nao ca'));
  // 3> co tours render cac tour ra
  return res.status(200).render('product_page', {
    title: 'Chào mừng bạn đến với của hàng nông sản',
    products,
  });
};
exports.manageProducts = async (req, res, next) => {
  const products = await Product.find();
  if (products.length <= 0)
    return next(new AppError(400, 'Chua co san pham nao ca'));
  return res.status(200).render('./manage_admin/manageProducts', {
    title: 'Quản lý sản phẩm',
    products,
  });
};
exports.manageUsers = async (req, res, next) => {
  // tim tat ca cac booking cua current use
  const products = await Product.find();
  if (products.length <= 0)
    return next(new AppError(400, 'Chua co san pham nao ca'));
  // 3> co tours render cac tour ra
  return res.status(200).render('product_page', {
    title: 'Chào mừng bạn đến với của hàng nông sản',
    products,
  });
};
exports.manageReviews = async (req, res, next) => {
  // tim tat ca cac booking cua current use
  const products = await Product.find();
  if (products.length <= 0)
    return next(new AppError(400, 'Chua co san pham nao ca'));
  // 3> co tours render cac tour ra
  return res.status(200).render('product_page', {
    title: 'Chào mừng bạn đến với của hàng nông sản',
    products,
  });
};
exports.manageOrders = async (req, res, next) => {
  // tim tat ca cac booking cua current use
  const products = await Product.find();
  if (products.length <= 0)
    return next(new AppError(400, 'Chua co san pham nao ca'));
  // 3> co tours render cac tour ra
  return res.status(200).render('product_page', {
    title: 'Chào mừng bạn đến với của hàng nông sản',
    products,
  });
};
