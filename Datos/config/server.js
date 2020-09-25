//===========================
//PUERTO
//===========================

process.env.PORT = process.env.PORT || 3000;



//===========================
//ENTORNO
//===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===========================
//BASE DATOS
//===========================

let urlDB;
//la condicional no quiere funcionar, es decir el url local no me quiere guardar nada 
//per me funciona para la nube quiero decir que guarda en el cluster pero todo en desarrollo 
//no en producion :`(
/*if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/Empleado';

} else {*/

//urlDB = process.env.MONGO_URI;
//}

//process.env.URLDB = urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/Empleado";
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

module.exports = {
    port: process.env.PORT
};