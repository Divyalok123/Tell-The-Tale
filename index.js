const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//for using static files
app.use(express.static('./assets'));

//using layouts
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes/index'));

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, function(err){
    if(err) {
        console.log(`Error running the server: ${err}`);
        return;
    }
    console.log(`Server is up and running @ port: ${port}`);
});

