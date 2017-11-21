const mongoose = require('mongoose'),
      UserModel = require('@WarehouseManagerModels/user');

const models = {
    User: mongoose.model('User')
}

module.exports = models;