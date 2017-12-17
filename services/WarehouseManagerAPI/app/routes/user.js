const passport = require('passport'),
      config = require('@config'),
      models = require('@WarehouseManager/app/setup')
      controller = require('@WarehouseManager/app/api/user.js'),
      router = require('express').Router;

const app = router();

app.post('/', controller.signup(models.User));

module.exports = (main) => {
      return app;
}