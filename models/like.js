const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    likeable: { /* defines object id of the liked object */
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: { /* defines the type of the liked object since this is a dynamic reference */ 
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;