const mongoose = require('mongoose');

const api = {};

api.setup = (User) => (req, res) => {
    const admin = new User({
        username: 'admin',
        password: 'admin',
        clients: []
    })
    admin.save(error => {
        if (error) throw error;

        console.log('Admin account was set up');
        res.json({success: true});
    });
};

api.index = (User, Token) => (req, res) => {
    const token = Token;

    if (token) {
        User.find({}, (error, users) => {
            if (error) throw error;
            res.status(200).json(users);
        });
    } else return res.status(403).send({success: false, message: 'Access Denied'});
};

api.signup = (User) => (req, res) => {
    if (!res.body.username || !req.body.username) return res.json({success: false, message: 'Please, pass a username and passwrd'})
    else {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            clients: []
        });

        newUser.save((error) => {
            if (error) return res.status(400).json({success: false, message: 'Username already exists'})
            return res.json({success: true, message: 'Account created successfully'});
        })
    }
}

module.exports = api;