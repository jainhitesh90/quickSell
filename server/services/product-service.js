var Product = require('../models/product')

exports.saveProduct = async function (product) {
    try {
        return await product.save();
    } catch (e) {
        throw Error('Error while saving product.')
    }
}

exports.getAllProducts = async function (limit, skip) {
    try {
        let total = await Product.find({}).count() 
        let products = await Product.find({}).limit(limit).skip(skip); 
        return { products, total} 
    } catch (e) {
        throw Error('Error while retrieving product list.')
    }
}

exports.getProductListByQuery = async function (query) {
    try {
        return await Product.find(query)
    } catch (e) {
        throw Error('Error while retrieving product.')
    }
}

exports.getProduct = async function (query) {
    try {
        return await Product.findOne(query)
    } catch (e) {
        throw Error('Error while retrieving product.')
    }
}

exports.deleteProduct = async function (query) {
    try {
        return await Product.deleteOne(query)
    } catch (e) {
        throw Error('Error while deleting product.')
    }
}