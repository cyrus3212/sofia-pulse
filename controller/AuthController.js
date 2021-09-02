const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({ error: err })
        }

        let user = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
    
        user.save().then(response => {
            res.json({ status: 200, message: 'User added successfully' })
        }).catch(error => {
            res.json({ status: 402, message: 'Error' })
        })
    });
}

const login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({ error: err })
                }

                if (result) {
                    let token = jwt.sign({ username: user.username}, 'verySecretValue', {expiresIn: '1h'});
                    res.json({ status: 200, message: 'Login Successful', token })
                } else {
                    res.json({ status: 402, message: 'Password is incorrect'})
                }
            })
        } else {
            res.json({ status: 402, message: 'No user found'})
        }
    })

}

module.exports = {
    register,
    login
}