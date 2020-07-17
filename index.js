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
const passportLocal = require("./config/passport-local");

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
		name: "Tell_the_tale",
		//change it before deployment for production
		secret: "to_decode_encode", //whenever encryption happens there is a key to encode and decode it, this is used for that
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 30, //the expiry time of the cookie
		},
	})
);

//telling the app to use passport
app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
	if (err) {
		console.log(`Error running the server: ${err}`);
		return;
	}
	console.log(`Server is up and running @ port: ${port}`);
});
