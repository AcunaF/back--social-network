//MIDDLEWARE se ejecuta antes de llegar a ejecutar el metodo de la ruta, una capa intermedia, se lo podemos poner a cada ruta que sea necesaria
//importar modulas
const jwt = require("jwt-simple");
const moment = require("moment");
//clave secreta
const libjwt = require("../token/jwt.token");
const secret = libjwt.secret;
//MIDDLEWARE de autentifiacion
exports.auth = (req, res, next) => {
  //comprobar si llega el header de autentificacion
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "la peticion no tiene la cabecera de autentificacion",
    });
  }
  //decodificar token limpiar el token por si viene con comillas simples o comilas dobles, reemplazo las comillas por nada
  let token = req.headers.authorization.replace(/[' "] + /g, " ");
  //decodificar token
  try {
    let payload = jwt.decode(token, secret);
    console.log(payload);
    //expiracion del token
    if (payload.exp <= moment().unix()) {
      return res.status(404).send({
        status: "error",
        message: "token expirado",
        error,
      });
    }
    //agregar datos de usuario a la req
    req.user = payload;
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "token no valido",
      error,
    });
  }
  //ejecutar la ruta
  next();
};
