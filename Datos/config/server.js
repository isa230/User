//===========================
//PUERTO
//===========================

process.env.PORT = process.env.PORT || 3000;



//===========================
//ENTORNO
//===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//===========================
// Vencimineto del token
//===========================

process.env.CADUCIDAD_TOKEN = '48h';


//===========================
//  SEED de autentificacion
//===========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-de desarrollo'

//===========================
//BASE DATOS
//===========================

let urlDB;
//la condicional no quiere funcionar, es decir el url local no me quiere guardar nada 
//per me funciona para la nube quiero decir que guarda en el cluster pero todo en desarrollo 
//no en producion :`(


if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/prueva';
} else {
    //urlDB = 'mongodb+srv://Isa230:M8OG0PIJAljLDjxg@cluster0.fnw1p.mongodb.net/prueva'
    urlDB = process.env.MONGO_URI;
}





process.env.URLDB = urlDB;
/*module.exports = {
    port: process.env.PORT
}*/

//======================
// Google Client ID
//======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '614999383171-bipcqkpr7e41k30bdr6bn2aaf5u35t3a.apps.googleusercontent.com;' //defirnie en heroku