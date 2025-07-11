const Cart = require('../models/cart');
const Product = require('../models/Product');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();


const calculateTotalBill = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.product.price;
  }, 0);
};

const addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');
  if (quantity > product.stockQuantity) throw new Error('Not enough stock');

  let cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity }],
    });
  } else {
    const index = cart.items.findIndex(item => item.product._id.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.populate('items.product'); // Ensure prices are accessible
  cart.total_bill = calculateTotalBill(cart.items);

  return await cart.save();
};

const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) throw new Error('Cart not found');
  
  cart.total_bill = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return {
    items: cart.items,
    totalAmount: cart.total_bill,
    status: cart.status,
  };
};


const updateCartStatus = async (userId, status) => {
  const cart = await Cart.findOneAndUpdate({ user: userId }, { status }, { new: true });
  if (!cart) throw new Error('Cart not found');
  return cart;
};



const updateItemQuantity = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) throw new Error('Cart not found');

  const item = cart.items.find((i) => i.product._id.toString() === productId);
  if (!item) throw new Error('Item not found in cart');

  if (quantity < 1) throw new Error('Quantity must be at least 1');
  item.quantity = quantity;

  cart.total_bill = calculateTotalBill(cart.items);
  await cart.save();
  return cart;
};

const removeItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) throw new Error('Cart not found');

  cart.items = cart.items.filter((item) => item.product._id.toString() !== productId);
  cart.total_bill = calculateTotalBill(cart.items);

  await cart.save();
  return cart;
};

//stripe session not working here
const createStripeSession = async (userId) => {
  const cart = await getCart(userId); 
  
  const line_items = cart.items.map((item) => ({
    price_data: {
      currency: 'pkr',
      product_data: {
        name: item.product.name,
      },
      unit_amount: item.product.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout`,
  });

  return session.url;
};


const markCartAsPaid = async (userId) => {
  return cartService.updateCartStatus(userId, 'paid');
};


module.exports = {
  getCart,
  createStripeSession,
  addToCart,
  updateItemQuantity,
  removeItem,
  markCartAsPaid,
  updateCartStatus,
  calculateTotalBill,
};