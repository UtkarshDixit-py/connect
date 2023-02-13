const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost/connect_development')
}

main().catch(err => console.log("ERROR",err));


const db = mongoose.connection;

db.once('open',function(){
    console.log('successfully connected to the database')
})

module.exports = db;