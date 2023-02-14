// importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");
//clave secreta
const secret = "Cotito01072021";
//funcion generadora de token
const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };
  //devolver jwt codificado
  return jwt.encode(payload, secret);
};

module.exports = {
  createToken,
  secret,
};
