const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.login = async function (req, res) {
    try {
        //when username and password is received
        //we find the user and generate the respective token

        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password) {
            // console.log('email: ', req.body.email);
            // console.log('req.body.password: ', req.body.password);
            // console.log('user.passoword: ', user.password);
            return res.status(422).json({ //422->invalid input
                message: 'Invalid Username/Password'
            });
        }

        return res.status(200).json({
            message: 'Successfully signed in!',
            data: {
                token: jwt.sign(user.toJSON(), 'tell_the_tale', {expiresIn: '100000'})
            }
        });


    } catch(err) {
        console.log('Error in users_api: ', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};