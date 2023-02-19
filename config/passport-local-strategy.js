const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find user and establish identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding the user");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("invalid username and password");

          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serliazation of the user to key to store in session cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deralization of the key
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding the user");
      return done(err);
    }
    return done(null, user);
  });
});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
  //if user is signed in then pass the req to next function(controller's action)
  if(req.isAuthenticated()){
    return next()
  }
  
  //if user is not signed in
  return res.redirect("/users/sign-in")
}

passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated){
    //req.user contains current signed in user and we are sending it to locals for the views
    res.locals.user = req.user
  }

  next();
}




module.exports = passport;