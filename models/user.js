const mongoose = require('mongoose');

//Setting up multer (for files)
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true //to know when it was created and when updated
});

/* Now linking AVATAR_PATH, multer and avartar field 
so that the file gets stored AVATAR_PATH */

//defining the storage
let storage = multer.diskStorage({
    destination: function(req,file,cb) { //cb->callback
        cb(null, path.join(__dirname, '..', AVATAR_PATH)); //first this dirname the .. to move up the ladder 
    },                                                     //to models and then moving AVATAR_PATH
    filename: function(req, file, cb) { 
        cb(null, file.fieldname + '-' + Date.now()); //fieldname->avatar
    }
}); 

//using the storage 

//defining static function                                   /* ↓ this tells that only one file(instance) will be uploaded for fieldname avatar */
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
                                         /* ↑ setting storage feild */
userSchema.statics.avatarPath = AVATAR_PATH; //making AVATAR_PATH publicly available 


const User = mongoose.model('User', userSchema);
module.exports = User;

