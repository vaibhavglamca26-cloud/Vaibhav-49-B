const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // lets HTML forms send PUT and DELETE via ?_method=

// data is stored in memory (array)
let products = [
  { id: 1, name: 'Laptop', price: 55000, description: '15 inch, 8GB RAM' },
  { id: 2, name: 'Mouse', price: 500, description: 'Wireless mouse' }
];
let nextId = 3;

// READ all
app.get('/products', (req, res) => res.render('index', { products }));
// CREATE form
app.get('/products/new', (req, res) => res.render('new'));
// CREATE
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  products.push({ id: nextId++, name, price: Number(price), description });
  res.redirect('/products');
});
// READ one
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.render('show', { product });
});
// UPDATE form
app.get('/products/:id/edit', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.render('edit', { product });
});
// UPDATE
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).send('Product not found');
  product.name = req.body.name;
  product.price = Number(req.body.price);
  product.description = req.body.description;
  res.redirect('/products/' + product.id);
});
// DELETE
app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.redirect('/products');
});

app.get('/', (req, res) => res.redirect('/products'));
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
