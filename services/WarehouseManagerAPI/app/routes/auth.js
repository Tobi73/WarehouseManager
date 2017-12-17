const models = require('@WarehouseManager/app/setup');
const controller = require('@WarehouseManager/app/api/auth.js');
const router = require('express').Router;

const app = router();

app.post('/', controller.login(models.User));

module.exports = (main) => {
    return app;
}