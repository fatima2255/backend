const cartService = require('../services/cartService');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await cartService.getCart(userId);
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  try {
    const updatedCart = await cartService.updateItemQuantity(userId, productId, quantity);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  try {
    const updatedCart = await cartService.removeItem(userId, productId);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getCart = async (req, res) => {
  
  const userId = req.user.userId;
  try {
    const cart = await cartService.getCart(userId); // Assuming JWT has userId
    res.json({ message: 'Cart fetched successfully', cart });
  } catch (e) {
    console.error('❌ Checkout controller error:', e.message);
    res.status(400).json({ message: e.message });
  }
};


exports.createCheckoutSession = async (req, res) => {
  
  const userId = req.user.userId;
  try {
    const sessionUrl = await cartService.createStripeSession(userId);
    res.json({ url: sessionUrl });
  } catch (err) {
    console.error('Stripe session error:', err.message);
    res.status(500).json({ message: 'Could not create checkout session' });
  }
};

exports.markCartAsPaid = async (req, res) => {
  try {
    await cartService.markCartAsPaid(req.user.userId);
    res.json({ message: 'Cart marked as paid' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to mark cart as paid' });
  }
};