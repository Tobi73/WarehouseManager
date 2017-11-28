const passport = require('passport'),
config = require('@config'),
models = require('@WarehouseManager/app/setup');

module.exports = (app) => {
const api = app.WarehouseManagerAPI.app.api.product;

app.route('/api/v1/products')
.post(passport.authenticate('jwt', config.session), api.store(models.User, models.Product, app.get('warehousesecret')))
.get(passport.authenticate('jwt', config.session), api.getAll(models.User, models.Product, app.get('warehousesecret')));
}