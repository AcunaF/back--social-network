//dependencias
const jwt = require("jwt-simple");
const moment = require("moment");
//clave secreta
const secret = "Cotito01072021";
//funcion token generadora de token
exports.createToken = (user) => {
  const payload = {
    id: user._id,
    name: user._name,
    surname: user._surname,
    nick: user.nick,
    email: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix,
  };
  //devolver jwt codificado
  return jwt.encode(payload, secret);
};
