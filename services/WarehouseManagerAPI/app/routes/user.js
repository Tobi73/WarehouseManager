const passport = require('passport'),
      config = require('@config'),
      models = require('@WarehouseManager/app/setup');

module.exports = (app) => {
    const api = app.WarehouseManagerAPI.app.api.user;

    app.route('/api/v1/signup')
       .post(api.signup(models.User));
}