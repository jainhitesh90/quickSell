const ProductService = require('../services/product-service');
var Product = require('../models/product');

exports.addProduct = async function (req, res) {
    try {
        let product = new Product(req.body);
        var result = await ProductService.saveProduct(product);
        res.status(200).json({ 'message': 'Your product has been addedd successfully', data: result });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getProduct = async function (req, res) {
    try {
        var product = await ProductService.getProduct({ _id: req.params.id })
        return res.status(200).json({ status: 200, product: product, message: "Product succesfully retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.getAllProducts = async function (req, res) {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0
    try {
        var product = await ProductService.getAllProducts(limit, skip)
        return res.status(200).json({ status: 200, products: product, message: "Product list succesfully retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.updateProduct = async function (req, res) {
    try {
        var product = await ProductService.getProduct({ _id: req.params.id })
        Object.keys(req.body).forEach(function (key) {
            product[key] = req.body[key];
        });
        ProductService.saveProduct(product);
        return res.status(200).json({ status: 200, product: product, message: "Product succesfully updated." });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}

exports.deleteProduct = async function (req, res) {
    try {
        var product = await ProductService.deleteProduct({ _id: req.params.id })
        return res.status(200).json({ status: 200, product: product, message: "Product succesfully deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, errorMessage: e.message });
    }
}