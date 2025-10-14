const express = require('express');
const app = express();

app.use(express.json());

//allow to communicate api with frontend
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
}));

//dotenv importation
require('dotenv').config();

//mongoDB connection string
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)  
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


 //crud operations in our mongoDB
const products = require('./models/products');

//add a product
app.post('/api/stuff', (req, res, next) => {
  const product = new products({
    ...req.body
  });
  product.save()
    .then(() => res.status(201).json({ message: 'Produit enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

//share products table with frontend 
app.get('/api/stuff', (req, res, next) => {
  products.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

app.get('/api/stuff/:id', (req, res, next) => {
  products.findOne({ _id: req.params.id })
    .then(product => res.status(200).json(product))
    .catch(error => res.status(404).json({ error }));
});
module.exports = app;