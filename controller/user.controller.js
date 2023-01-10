//dependencias y modulos

const User = require("../models/user.models");
//testing
const userTesting = (req, res) => {
  return res.status(200).json({
    message: "message sent from user.controllers.js",
  });
};

//registro de usuarios
const register = (req, res) => {
  //1- recoger datos
  let userParams = req.body;
  console.log(userParams);
  //2- comprobar que lleguen bien y se validen
  if (
    !userParams.name ||
    !userParams.email ||
    !userParams.password ||
    !userParams.nick
  ) {
    return res.status(400).json({
      status: "error",
      message: "faltan datos",
    });
  }
  //2.1- crear objeto del usuario validado
  let userValid = new User(userParams);
  //3- controlar que el usuario exista o este duplicado
  User.find({
    $or: [
      { email: userValid.email.toLowerCase() },
      { nick: userValid.email.toLowerCase() },
    ],
  }).exec((error, users) => {
    if (error)
      return res.status(500).json({
        status: "error",
        message: "error en la consulta de usuarios",
      });

    if (users && users.length >= 1) {
      //esto significa que ya existe un usuario (users.length >=1)
      return res.status(200).send({
        status: "succes",
        message: "el usuario existe",
      });
    }
    //4- contraseña
    //5- guardar usuario en BDD
    //6- respuesta
  });

  return res.status(200).json({
    status: "succes",
    message: "metodo register ok",
    userValid,
  });
};

//exportar
module.exports = {
  userTesting,
  register,
};
