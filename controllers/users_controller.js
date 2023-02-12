module.exports.profile = function(req,res){
    // return res.end('<h1>User profle</h1>')

    return res.render('user_profile',{
        title : 'Users',
    })
}