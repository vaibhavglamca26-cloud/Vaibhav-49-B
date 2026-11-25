const express = require('express');
const app = express();

app.set('view engine', 'ejs');               // template engine = EJS (looks in /views)
app.use(express.urlencoded({ extended: true })); // to read form data in POST

const messages = [];

// 1. GET /
app.get('/', (req, res) => res.render('home', { title: 'Home' }));

// 2. GET /about
app.get('/about', (req, res) => res.render('about', { title: 'About' }));

// 3. GET /contact (shows form)
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact' }));

// 4. POST /contact (receives form)
app.post('/contact', (req, res) => {
  messages.push({ name: req.body.name, text: req.body.message });
  res.redirect('/messages');
});

// 5. GET /messages
app.get('/messages', (req, res) => res.render('messages', { title: 'Messages', messages }));

// 6. GET /user/:name (route parameter)
app.get('/user/:name', (req, res) => res.render('user', { title: 'User', name: req.params.name }));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
