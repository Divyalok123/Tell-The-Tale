const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')

//transporter -> an object which will be attached with nodemailer
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        // user: 'Divyalok Jaiswal',
        user: 'divyjais2001@gmail.com',
        pass: 'DV@DTU2K18'
    }
});

//defining that we will be using ejs and template rendering engine
//relativePath -> from where the mail is being sent
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err) 
            {
                console.log('Error in rendering template: ', err);
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}