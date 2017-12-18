const passport = require('passport'),
config = require('@config'),
models = require('@WarehouseManager/app/setup'),
controller = require('@WarehouseManager/app/api/product.js'),
router = require('express').Router;

const app = router();

app.get('/', controller.getAll(models.Product));
app.post('/', controller.store(models.Product));
app.delete('/', controller.delete(models.Product));
app.get('/search', controller.find(models.Product));
app.get('/export', controller.export(models.Product));

module.exports = (main) => {
    return app;
}