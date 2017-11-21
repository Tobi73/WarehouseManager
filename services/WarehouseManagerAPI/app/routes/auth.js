const models = require('@WarehouseManager/app/setup');

module.exports = (app) => {
    const api = app.WarehouseManagerAPI.app.api.auth;

    app.route('/')
       .get((req, res) => res.send('Warehouse manager API'));

    app.route('/api/v1/auth')
       .post(api.login(models.User));    
};