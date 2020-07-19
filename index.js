const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//express session (user for session cookie)
const session = require("express-session");
//requiring the passport and the local-strategy we set up
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//setting up mongo store
const MongoStore = require('connect-mongo')(session); //(session) argument because we need to store the session informantion in the database 

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
	src: './assets/scss',
	dest: './assets/css',
	debug: true, //it should be false in production mode
	outputStyle: 'extended', //whether we want it to be single line or multiline
	prefix: '/css' //where should the server look for css files
})); //just before the server starts so that we can precompile it before the server starts and whenever the browser asks for it, these precompiled files will be provided 

//reading post requests
app.use(express.urlencoded({ extended: true }));

//setting up the cookie-parser
app.use(cookieParser());

//for using static files
app.use(express.static("./assets"));

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
		secret: 'to_decode_encode', //whenever encryption happens there is a key to encode and decode it, this is used for that
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

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
	if (err) {
		console.log(`Error running the server: ${err}`);
		return;
	}
	console.log(`Server is up and running @ port: ${port}`);
});
