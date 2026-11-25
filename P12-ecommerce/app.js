const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
const ADMIN_PASSWORD = 'admin123'; // seller panel password (change it)

mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDB').then(async () => {
  console.log('MongoDB connected');
  if (await Product.countDocuments() === 0) {   // add sample products first time
    await Product.insertMany([
      { name: 'Wireless Mouse', price: 599, description: '2.4GHz wireless mouse', image: 'https://picsum.photos/seed/mouse/300/200' },
      { name: 'Headphones', price: 1499, description: 'Over-ear bass headphones', image: 'https://picsum.photos/seed/headphones/300/200' },
      { name: 'Backpack', price: 999, description: 'Water resistant laptop bag', image: 'https://picsum.photos/seed/backpack/300/200' },
      { name: 'Water Bottle', price: 349, description: 'Steel bottle, 1 litre', image: 'https://picsum.photos/seed/bottle/300/200' }
    ]);
  }
}).catch(err => console.log('MongoDB error:', err.message));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({ secret: 'lab-secret', resave: false, saveUninitialized: true }));

// cart lives in the session; available count is shown in the navbar
app.use((req, res, next) => {
  req.session.cart = req.session.cart || [];
  res.locals.cartCount = req.session.cart.reduce((s, i) => s + i.qty, 0);
  res.locals.isAdmin = !!req.session.isAdmin;
  next();
});

const cartTotal = cart => cart.reduce((s, i) => s + i.price * i.qty, 0);
const requireAdmin = (req, res, next) => req.session.isAdmin ? next() : res.redirect('/admin/login');

/* ---------- Customer side ---------- */
// 1. show all products
app.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('shop', { products });
});

// 2. add to cart
app.post('/cart/add/:id', async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.redirect('/');
  const existing = req.session.cart.find(i => i.id === String(p._id));
  if (existing) existing.qty++;
  else req.session.cart.push({ id: String(p._id), name: p.name, price: p.price, qty: 1 });
  res.redirect('/cart');
});

app.get('/cart', (req, res) => res.render('cart', { cart: req.session.cart, total: cartTotal(req.session.cart) }));

app.post('/cart/remove/:id', (req, res) => {
  req.session.cart = req.session.cart.filter(i => i.id !== req.params.id);
  res.redirect('/cart');
});

// 3. checkout + payment (simulated card payment)
app.get('/checkout', (req, res) => {
  if (req.session.cart.length === 0) return res.redirect('/cart');
  res.render('checkout', { total: cartTotal(req.session.cart), error: null });
});

app.post('/checkout', async (req, res) => {
  const cart = req.session.cart;
  const total = cartTotal(cart);
  if (cart.length === 0) return res.redirect('/cart');
  const { name, address, card, expiry, cvv } = req.body;
  const cardDigits = (card || '').replace(/\s/g, '');
  if (!/^\d{16}$/.test(cardDigits) || !/^\d{3}$/.test(cvv || '')) {
    return res.render('checkout', { total, error: 'Payment failed: enter a 16 digit card number and 3 digit CVV.' });
  }
  // Payment accepted (demo). In a real project use Razorpay/Stripe test mode here.
  await Order.create({
    customer: name, address, items: cart.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
    total, paymentId: 'PAY' + Date.now(), status: 'Paid'
  });
  req.session.cart = [];
  res.redirect('/orders?success=1');
});

// 4. successful orders section
app.get('/orders', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.render('orders', { orders, success: req.query.success });
});

/* ---------- Seller (master) panel ---------- */
app.get('/admin/login', (req, res) => res.render('login', { error: null }));
app.post('/admin/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) { req.session.isAdmin = true; return res.redirect('/admin'); }
  res.render('login', { error: 'Wrong password' });
});
app.get('/admin/logout', (req, res) => { req.session.isAdmin = false; res.redirect('/'); });

app.get('/admin', requireAdmin, async (req, res) => {
  const products = await Product.find();
  res.render('admin', { products });
});
app.get('/admin/new', requireAdmin, (req, res) => res.render('admin-form', { product: null }));
app.post('/admin/products', requireAdmin, async (req, res) => {
  await Product.create(req.body);
  res.redirect('/admin');
});
app.get('/admin/products/:id/edit', requireAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin-form', { product });
});
app.put('/admin/products/:id', requireAdmin, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin');
});
app.delete('/admin/products/:id', requireAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
