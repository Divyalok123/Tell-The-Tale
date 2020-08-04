const nodeMailer = require('../config/nodemailer');

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

    let ourHTML = nodeMailer.renderTemplate({comment: comment}, '/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: '"Divyalok Jaiswal X)" <divyjais2001@gmail.com>',
        to: comment.user.email, //incase of post it will be comment.post.user.email
        subject: 'Yay! New comment published',
        html: ourHTML
    }, (err, info) => { //info -> information about the request that has been sent
        if(err) {
            console.log('Error in sending mail: ', err);
            return;
        }

        console.log('Mail delivered: ', info);
        return;
    });
}