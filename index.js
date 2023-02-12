const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const app = express();
const port = 8000;

app.use(express.static('./assets'))

app.use(expressLayouts)
app.set('layout extractStyles',true);
app.set('layout extractScript',true);


//use express router
app.use('/', require('./routes'))

//set up the view engine
app.set('view engine','ejs')
app.set('views','./views')

app.listen(port, (err) => {
  if (err) {
    console.log(`Error occured : ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
