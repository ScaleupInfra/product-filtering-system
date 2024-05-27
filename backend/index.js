const express = require('express');
const cors = require('cors');
const app = express();

const products = [
  { "id": 1, "name": "Product A", "category": "Electronics", "price": 99.99 },
  { "id": 2, "name": "Product B", "category": "Clothing", "price": 29.99 },
  { "id": 3, "name": "Product C", "category": "Electronics", "price": 149.99 },
  { "id": 4, "name": "Product D", "category": "Clothing", "price": 49.99 }
];

app.use(cors());
app.use(express.json());

app.get('/filter', (req, res) => {
  const category = req.query.category;
  const sortBy = req.query.sort_by;

  console.log(category, sortBy)

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (sortBy === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const productHtml = `
    <ul>
      ${filteredProducts.map(p => `
        <li>
          <h3>${p.name}</h3>
          <p>Category: ${p.category}</p>
          <p>Price: $${p.price}</p>
        </li>
      `).join('')}
    </ul>
  `;

  res.send(productHtml);
});

app.get('/products', (req, res) => {
  res.json(products);
});


app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
