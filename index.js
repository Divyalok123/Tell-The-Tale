const express = require("express");

/* getting ready for deployment */
//requiring environment config
const env = require('./config/environment');

//for getting logs in a file during production env
const logger = require('morgan'); 
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//express session (used for session cookie)
const session = require("express-session");
//requiring the passport and the local-strategy we set up
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
//requiring passport jwt strategy from config
const passpostJWT = require('./config/passport-jwt-strategy');
//requiring google-strategy
const passportGoogle = require('./config/passport-google-oauth2-strategy');
//setting up mongo store
const MongoStore = require('connect-mongo')(session); //(session) argument because we need to store the session informantion in the database 
//requiring sass middleware
const sassMiddleware = require('node-sass-middleware');
//for flash messages
const flash = require('connect-flash');
//requiring custom middleware for flash messages
const flashware = require('./config/middleware');

//using socket.io for chatting engine
const chatServer = require('http').Server(app); 
//requiring file and function for socket config 
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
//socket server will be running at a different port
chatServer.listen(5000);
console.log('Chatserver is listening at port 5000!');


const path = require('path');

// console.log('printing from index: ',  path.join(__dirname, env.asset_path, 'css'));

//just before the server starts so that we can precompile it before the server starts and whenever the browser asks for it, these precompiled files will be provided 
if(env.name == 'development') {
	app.use(sassMiddleware({
		// src: './assets/scss',
		src: path.join(__dirname, env.asset_path, 'scss'),
		dest: path.join(__dirname, env.asset_path, 'css'),
		debug: true, //it should be false in production mode
		outputStyle: 'extended', //whether we want it to be single line or multiline
		prefix: '/css' //where should the server look for css files
	})); 
}

//reading post requests
app.use(express.urlencoded({ extended: true }));

//setting up the cookie-parser
app.use(cookieParser());

//for using static files
app.use(express.static(path.join(__dirname, env.asset_path))); 

//(making upload path available to browser)
app.use('/uploads', express.static(__dirname + '/uploads'));

//using layouts
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
	session({
        name: "Tell_the_tale", //name of cookie
		secret: env.session_cookie_key, //whenever encryption happens there is a key to encode and decode it, this is used for that *(it should be changed)*
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: (1000 * 60 * 100) //the expiry time of the cookie
        },
        store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err) { //callback function for the connection
            console.log(err || 'connect-mongo setup successful');
        })
	})
);

//telling the app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
//using custom flash middleware
app.use(flashware.setFlash);

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
	if (err) {
		console.log(`Error running the server: ${err}`);
		return;
	}
	console.log(`Server is up and running @ port: ${port}`);
});
