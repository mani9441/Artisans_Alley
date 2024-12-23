const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/add-product', (req, res) => {
  const newProduct = req.body;

  fs.readFile('products.json', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    let products = JSON.parse(data);
    products.push(newProduct);

    fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }

      res.status(200).send('Product added successfully');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
