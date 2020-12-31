const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

//where the logs will be stored
const logDirectory = path.join(__dirname, '../production_logs');
//find if production logs file already exit or it should be created
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); 

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: "to_decode_encode",
    db: 'tell_the_tale_development',
    smtp: {
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            // user: 'Divyalok Jaiswal',
            user: 'divyjais2001@gmail.com',
            pass: 'DV@DTU2K18'
        }
    }, 
    google_client_id: '194770133150-j9537tkqima5aqvpehjqa1c4u21ksjle.apps.googleusercontent.com',
    google_client_secret: 'l8vTu341CXiwVLy58xwJ9gok',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'tell_the_tale',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }
}

const production = {
    name: 'production',
    asset_path: process.env.TELL_THE_TALE_ASSET_PATH,
    session_cookie_key: process.env.TELL_THE_TALE_SESSION_COOKIE_KEY,
    db: process.env.TELL_THE_TALE_DB,
    smtp: {
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            // user: 'Divyalok Jaiswal',
            user: process.env.TELL_THE_TALE_GMAIL_USERNAME,
            pass: process.env.TELL_THE_TALE_GMAIL_PASSWORD
        }
    }, 
    google_client_id: process.env.TELL_THE_TALE_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.TELL_THE_TALE_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.TELL_THE_TALE_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.TELL_THE_TALE_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogStream
        }
    }
}

// module.exports = development;
// module.exports = production;
module.exports = (eval(process.env.TELL_THE_TALE_ENVIRONMENT) == undefined) ? development : eval(process.env.TELL_THE_TALE_ENVIRONMENT);