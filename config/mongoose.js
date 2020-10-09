//requiring mongoose
const mongoose = require('mongoose');

//getting deployment ready
const env = require('./environment');

//setting up connection with database
mongoose.connect(`mongodb://localhost:27017/${env.db}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

//if error occurs
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log("Connection with MongoDB: Successful!");
});

module.exports = db;