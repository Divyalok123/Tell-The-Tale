const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')

const env = require('./environment');

//transporter -> an object which will be attached with nodemailer
let transporter = nodemailer.createTransport(env.smtp);

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