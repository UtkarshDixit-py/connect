const Post = require("../models/post");


module.exports.create = (req,res)=>{
    Post.create({
        content : req.body.content,
        user:req.body._id
    },function(err,post){
        if(err){
            console.log("Error in creating console");
        }
        return res.redirect('back');
    })

}