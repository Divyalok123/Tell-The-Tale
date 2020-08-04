const nodeMailer = require('../config/nodemailer');
const nodemailer = require('../config/nodemailer');

/*
let newComment = function(__ , __ ) {
    ________
} 
module.exports = newComment;

instead of ↑ we can do ↓ (another way of exporting a method)
*/

exports.newComment = (comment) => {
    // console.log('Inside new comment mailer: ', comment);
    // console.log('email: ', comment.user.email);
    nodeMailer.transporter.sendMail({
        from: 'divyjais2001@gmail.com',
        to: comment.user.email, //incase of post it will be comment.post.user.email
        subject: 'Yay! New comment published',
        html: '<h2>Your comment is published at Tell The Tale!<h2>'
    }, (err, info) => { //info -> information about the request that has been sent
        if(err) {
            console.log('Error in sending mail: ', err);
            return;
        }

        console.log('Mail delivered: ', info);
        return;
    });
}