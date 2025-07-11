const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticate = require('../middlewares/auth.middleware');

router.post('/add', authenticate, cartController.addToCart);
router.get('/', authenticate, cartController.getCart);

router.put('/update', authenticate, cartController.updateCartItem);
router.delete('/remove/:productId', authenticate, cartController.removeCartItem);




module.exports = router;
