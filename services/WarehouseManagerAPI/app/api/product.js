const mongoose = require('mongoose');

const api = {};

api.store = (User, Product, Token) => (req, res) => {
    if (Token) {
        console.log(req.body);
        const product = new Product({
            name: req.body.name,
            price: parseInt(req.body.price),
            quantity: parseInt(req.body.quantity)
        });

        product.save(error => {
            if (error) return res.status(400).json(error);
            res.status(200).json({success: true, 
                                    message: 'Product was added'});
            
        })
    } else { 
        return res.status(403).send({success: false, message: 'Unauthorized'});
    }
}


api.getAll = (User, Product, Token) => (req, res) => {
    if (Token) {
      Product.find({}, (error, client) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(client);
        return true;
      })
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }
  
  module.exports = api;