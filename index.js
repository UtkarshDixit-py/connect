const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const mongoose = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();
const port = 8000;


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts)
app.set('layout extractStyles',true);
app.set('layout extractScript',true);




//set up the view engine
app.set('view engine','ejs')
app.set('views','./views')


//using mongo store to store the session cookie in db
app.use(session({
  name : "connect",
  //to do change secret before deoploying in production mode
  secret : "yoyoyoyo",
  saveUninitialized : false,
  resave : false,
  cookie : {
    maxAge : (1000 * 60 * 100)
  },
  store : new MongoStore(
    {
    mongooseConnection : db,
    autoRemove : 'disabled'
    },
    function(err){
      console.log(err || 'connect-mongo setup ok');
    }
  )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express router
app.use('/', require('./routes'))



app.listen(port, (err) => {
  if (err) {
    console.log(`Error occured : ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
