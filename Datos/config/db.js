//
//
const mongoose = require('mongoose');
require('./server');


//mongoose.connect(process.env.URLDB, {

mongoose.connect("mongodb://localhost:27017/prueva", {

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DATABASE ONLINE");
});