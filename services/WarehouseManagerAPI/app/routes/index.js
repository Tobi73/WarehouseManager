const product = require('@WarehouseManager/app/routes/product.js')();
const user = require('@WarehouseManager/app/routes/user.js')();
const auth = require('@WarehouseManager/app/routes/auth.js')();
const router = require('express').Router; 
const passport = require('passport');
const config = require('@config');

module.exports = (main) => {
    const api = router();
    const app = router();

    const isAuthorized = (req, res, next) => {
        if (app.get('warehousesecret')) {
            next();
        } else return res.status(403).send({success: false, message: 'Unauthorized'});
    }
    
    app.use('/products', passport.authenticate('jwt', config.session), isAuthorized, product)
       .use('/auth', auth)
       .use('/signup', user)
    
    api.use('/api/v1', app);

    main.use(api); 
};