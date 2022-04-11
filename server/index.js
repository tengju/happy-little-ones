// Since it was not a requirement to create a backend server, 
// I decided to create a simple api with the products
// that I am able to use for basic purpose.
const express = require('express');
const cors = require('cors');
const products = require('./products.js');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(product => product.id === req.params.id);
  if (!product) {
    res.status(404).send({ error: 'Product not found' });
  }
  res.send(product);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));