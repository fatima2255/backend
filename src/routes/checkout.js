const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/auth.middleware');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.get('/checkout', authMiddleware, cartController.getCart)
router.post('/create-checkout-session', authMiddleware, cartController.createCheckoutSession)

router.post('/mark-paid', authMiddleware, cartController.markCartAsPaid);


module.exports = router;
