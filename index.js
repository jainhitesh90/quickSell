const path = require('path')
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRouter = require('./server/routes/product-routes.js')

const app = express();
const port = parseInt(process.env.PORT) || 5000
const uri = process.env.DB_URI

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully!");
})

app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRouter);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port , function () {
    console.log("Server is running on Port : " + port);
});