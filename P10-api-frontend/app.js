const express = require('express');
const app = express();

app.use(express.json());            // read JSON body
app.use(express.static('public'));  // serve the front end from /public

let products = [
  { id: 1, name: 'Laptop', price: 55000, rating: 4.5 },
  { id: 2, name: 'Headphones', price: 1999, rating: 4.1 },
  { id: 3, name: 'Keyboard', price: 899, rating: 4.3 }
];

// API: get all products
app.get('/api/products', (req, res) => res.json(products));

// API: add a product
app.post('/api/products', (req, res) => {
  const { name, price, rating } = req.body;
  const product = { id: products.length ? products[products.length - 1].id + 1 : 1, name, price: Number(price), rating: Number(rating) };
  products.push(product);
  res.status(201).json(product);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
