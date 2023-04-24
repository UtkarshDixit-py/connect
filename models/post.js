const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: True

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:true
})

const Post = mongoose.model('User',userSchema);

module.exports = Post;