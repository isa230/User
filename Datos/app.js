require('./config/server');
require('./config/db')


const express = require('express');
const mongoose = require('mongoose');

const app = express();

const api = require('./routers/routers')

const bodyParser = require('body-parser');
//  analizar aplicación / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//  analizar aplicación / json
app.use(bodyParser.json());


// Configuracion global de routers
app.use(api);


app.listen(process.env.PORT, () => {
    console.log('En el puerto', process.env.PORT);
});