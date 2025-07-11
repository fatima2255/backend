const express = require('express');
const router = express.Router();
const productAccess = require('../middlewares/product.middleware');
const authMiddleware = require('../middlewares/auth.middleware'); // your JWT token verifier

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getPaginatedProducts,
} = require('../controllers/productController');

// view all route
router.get('/', authMiddleware, productAccess('view'), getPaginatedProducts);

// add product route
router.post('/add', authMiddleware, productAccess('add'), addProduct);

// update route
router.put('/:id', authMiddleware, productAccess('update'), updateProduct);

// delete route
router.delete('/:id', authMiddleware, productAccess('delete'), deleteProduct);

module.exports = router;
