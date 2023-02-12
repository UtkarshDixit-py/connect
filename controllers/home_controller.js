// module.exports.actionName = function(req,res){

// }

module.exports.home = function(req,res){
    // return res.end('<h1>Home controller</h1>')

    return res.render('home',{
        title : 'Home',
        
    })
}