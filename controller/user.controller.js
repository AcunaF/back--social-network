//dependencias y modulos
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const jwt = require("../token/jwt.token"); //%conseguir token//jwt.token.js

//testing
const userTesting = (req, res) => {
  return res.status(200).json({
    message: "message send from user.controllers.js",
    usuario: req.user,
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
      message: "missing data",
    });
  }

  //3- controlar que el usuario exista o este duplicado
  User.find({
    $or: [
      { email: userParams.email.toLowerCase() },
      { nick: userParams.nick.toLowerCase() },
    ],
  }).exec(async (error, users) => {
    if (error)
      return res.status(500).json({
        status: "error",
        message: "data query error",
      });

    if (users && users.length >= 1) {
      //esto significa que ya existe un usuario (users.length >=1)
      return res.status(500).send({
        status: "ERROR",
        message: "the user exists",
      });
    }
    //4- contraseña
    let pwd = await bcrypt.hash(userParams.password, 10);
    userParams.password = pwd;
    //2.1- crear objeto del usuario validado
    let userValid = new User(userParams);
    //5- guardar usuario en BDD
    userValid.save((error, userStored) => {
      if (error || !userStored)
        return res.status(500).send({
          status: "error",
          message: "error saving user",
        });
      //6- respuesta
      return res.status(200).json({
        status: "succes",
        message: "successfully registered user",
        userStored,
      });
    });
  });
};
const login = (req, res) => {
  //recoger parametros del body
  let params = req.body;
  if (!params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      message: " missing data to send ",
    });
  }
  //buscar en la BDD si existe
  User.findOne({ email: params.email })
    //.select({ password: 0 })
    .exec((error, userbd) => {
      if (error || !userbd)
        return res.status(404).send({
          status: "error",
          message: "Username does not exist",
        });
      //comprobar contraseña
      const pwd = bcrypt.compareSync(params.password, userbd.password);

      if (!pwd) {
        return res.status(400).send({
          message: "you have not correctly identified",
        });
      }

      //conseguir token//jwt.token.js
      const token = jwt.createToken(User);

      //devolver datos del usuario
      return res.status(200).json({
        status: "succes",
        message: "successfully login user",
        userbd: {
          id: userbd._id,
          name: userbd.name,
          email: userbd.email,
        },
        token,
      });
    });
};

const profile = (req, res) => {
  //recibir parametros del id del usuario por url
  const id = req.params.id;
  //consulta para sacar los datos del usuario
  User.findById(id, (error, userProfile) => {
    if (error || !userProfile)
      return res.status(404).json({
        status: "error",
        message: "user no exist",
      });

    //devolver datos
    return res.status(200).json({
      status: "succes",
      message: "successfully getting user data",
      userProfile,
    });
  });
};

//exportar
module.exports = {
  userTesting,
  register,
  login,
  profile,
};
