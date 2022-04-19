// Since it was not a requirement to create a backend server, 
// I decided to create a simple api with the products
// that I am able to use for basic purpose.
const express = require('express');
const cors = require('cors');
const products = require('./products.js');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const getProductDateAdded = (product) => {
  const [day, month, year] = product.DateAdded.split('-');
  return new Date(Number(year), Number(month), Number(day));
};

const sortByDateFunction = (a, b) =>
  getProductDateAdded(b).valueOf() - getProductDateAdded(a).valueOf();


app.get('/products', (req, res) => {
  const { page, brand, type } = req.query;
  const offset = (page - 1) * 10;
  const filteredResponse = products.filter(product => {
    if (brand && product.brand !== brand) return false;
    if (type && product.type !== type) return false;
    return true;
  }).sort(sortByDateFunction).slice(offset, offset + 10)
  res.send(filteredResponse);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(product => product.id === req.params.id);
  if (!product) {
    res.status(404).send({ error: 'Product not found' });
  }
  res.send(product);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));