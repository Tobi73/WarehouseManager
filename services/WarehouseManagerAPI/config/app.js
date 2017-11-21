const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      consign = require('consign'),
      cors = require('cors'),
      passport = require('passport'),
      passportCfg = require('./passport')(passport),
      jwt = require('jsonwebtoken'),
      config = require('./index.js'),
      database = require('./database')(mongoose, config);

app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.set('warehousesecret', config.secret);

consign({cwd: 'services'})
        .include('WarehouseManagerAPI/app/setup')
        .then('WarehouseManagerAPI/app/api')
        .then('WarehouseManagerAPI/app/routes')
        .into(app);

module.exports = app;

