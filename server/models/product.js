const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    product_id: {
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);