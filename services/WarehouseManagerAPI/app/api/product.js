const mongoose = require('mongoose');
const fs = require('fs');
const XlsxTemplate = require('xlsx-template');
const path = require('path');

const api = {};

api.store = (Product) => (req, res) => {
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
}


api.getAll = (Product) => (req, res) => {
    Product.find({}, (error, client) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(client);
        return true;
    })
  }

api.find = (Product) => (req, res) => {
    console.log(req.query);
    Product.find({'name' : new RegExp(req.query.name, 'i')}, (error, products) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(products);
    })
}

api.export = (Product) => (req, res) => {
    fs.readFile(path.join(__dirname, '..','..', 'static', 'export.xlsx'), (err, data) => {
        var template = new XlsxTemplate(data);
        var sheetNumber = 1;
        var values = Product.find({}, (error, products) => {
            if (error) return res.status(400).json(error);
            var values = {
                products
            }
            template.substitute(sheetNumber, values);
            const report = template.generate();
            res.status(200).type('xlsx').send(new Buffer(report, 'binary'));
        })
    });
}
  
module.exports = api;