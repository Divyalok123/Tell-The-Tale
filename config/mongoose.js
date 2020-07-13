//requiring mongoose
const mongoose = require('mongoose');

//setting up connection with database
mongoose.connect('mongodb://localhost:27017/tell_the_tale_development', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

//if error occurs
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log("Connection with MongoDB: Successful!");
});

module.exports = db;