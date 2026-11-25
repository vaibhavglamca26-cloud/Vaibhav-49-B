const mongoose = require('mongoose');
module.exports = mongoose.model('Order', new mongoose.Schema({
  customer: String,
  address: String,
  items: [{ name: String, price: Number, qty: Number }],
  total: Number,
  paymentId: String,
  status: { type: String, default: 'Paid' },
  createdAt: { type: Date, default: Date.now }
}));
