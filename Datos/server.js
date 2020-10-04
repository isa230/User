require('./config/server');
require('./config/db')


const express = require('express');
const cors = require("cors");

const path = require('path');

const app = express();

const api = require('./routers/routers')


const bodyParser = require('body-parser');
//  analizar aplicación / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//  analizar aplicación / json
app.use(bodyParser.json());
app.use(cors());



// Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));



// Configuracion global de routers
app.use(api);


app.listen(process.env.PORT, () => {
    console.log('En el puerto', process.env.PORT);
});