const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

// Local MongoDB. For Atlas, replace with your connection string.
mongoose.connect('mongodb://127.0.0.1:27017/productsDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err.message));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String
}));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => res.redirect('/products'));

// READ all
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('index', { products });
});
// CREATE form
app.get('/products/new', (req, res) => res.render('new'));
// CREATE
app.post('/products', async (req, res) => {
  await Product.create(req.body);
  res.redirect('/products');
});
// READ one
app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.render('show', { product });
});
// UPDATE form
app.get('/products/:id/edit', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.render('edit', { product });
});
// UPDATE
app.put('/products/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/products/' + req.params.id);
});
// DELETE
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
