//
//
const mongoose = require('mongoose');
require('./server');

//mongoose.connect("mongodb://localhost:27017/prueva", {

mongoose.connect(process.env.URLDB, {

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true


});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DATABASE ONLINE");
});