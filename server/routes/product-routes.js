const express = require('express');
const productRoutes = express.Router();

var ProductController = require('../controllers/product-controller');

productRoutes.post('/add', ProductController.addProduct);
productRoutes.get('/getAllProducts', ProductController.getAllProducts);
productRoutes.post('/update/:id', ProductController.updateProduct);
productRoutes.get('/:id', ProductController.getProduct);
productRoutes.delete('/:id', ProductController.deleteProduct);

module.exports = productRoutes;