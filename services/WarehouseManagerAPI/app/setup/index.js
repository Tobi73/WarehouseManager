const mongoose = require('mongoose'),
      UserModel = require('@WarehouseManagerModels/user')
      ProductModel = require('@WarehouseManagerModels/product');

const models = {
    User: mongoose.model('User'),
    Product: mongoose.model('Product')
}

module.exports = models;