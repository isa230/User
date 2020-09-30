//

const jwt = require('jsonwebtoken');


//======================
// Verificar Token
//======================

const verifyToken = (req, res, next) => {

        let token = req.get('token');

        jwt.verify(token, process.env.SEED, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Token invalid'
                    }
                });

            }
            req.usuario = decoded.usuario;
            next();

        });
    }
    /*const verifyToken = (req, res, next) => {
        if (!req.get("token")) {
            return res.send();
        }

        let token = req.get("token");

        jwt.verify(token, process.env.NODE_SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: "Token invalid",
                    }
                });
            }

            req.usuario = decoded.user;
            next();
        });
    };*/


//======================
// Verify ADMIN_ROLE
//======================

/*const verifyAdmin = (req, res, next) => {

    if (req.query.Admin === 'true') {
        next()
    } else {
        return res.json({
            ok: false,
            err: {
                message: ' Is not Admin'
            }
        });
    }

}*/

const verifyAdmin = (req, res, next) => {

    const usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {


        return res.json({
            ok: false,
            err: {
                message: "The user not is admin"
            }
        });
    }

    /*  console.log(req.usuario);
    let usuario = req.usuario;

    if (usuario.role === "ADMIN_ROLE") {

        next();
    } else {
        verifySuperAdmin(req, res, next);
    }*/
};



module.exports = {
    verifyToken,
    verifyAdmin
};