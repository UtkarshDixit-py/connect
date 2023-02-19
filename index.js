const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const mongoose = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');

const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts)
app.set('layout extractStyles',true);
app.set('layout extractScript',true);




//set up the view engine
app.set('view engine','ejs')
app.set('views','./views')


app.use(session({
  name : "connect",
  //to do change secret before deoploying in production mode
  secret : "yoyoyoyo",
  saveUninitialized : false,
  resave : false,
  cookie : {
    maxAge : (1000 * 60 * 100)
  }
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
