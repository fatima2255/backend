const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
  total_bill: { type: Number, required: true, default: 0 },
  status: { type: String, default: 'pending' }, // or use an enum
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);