// services/productService.js
const Product = require('../models/Product');

exports.addProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

exports.getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

exports.updateProductById = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteProductById = async (id) => {
  return await Product.findByIdAndDelete(id);
};
