// module.exports.actionName = function(req,res){

// }

module.exports.home = function(req,res){
    // return res.end('<h1>Home controller</h1>')

    console.log(req.cookies)

    return res.render('home',{
        title : 'Home',
        
    })
}