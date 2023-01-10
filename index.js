//importar dependencias
const connection = require("./dataBase/conection");
const express = require("express");
const cors = require("cors");
console.log("api node started");
//coneccion a la BDD
connection();
//crear servidor
const app = express();
const port = 3900;
// configurar cors
app.use(cors());
//convertir datos del body a obj json
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //transforma cualquier dato en json
//configurar rutas de testeo
app.get("/test", (req, res) => {
  return res.status(200).json({
    id: 1,
    Nombre: "Facundo",
    Apellidos: "Acuña",
    Email: "facuna30@gmail.com",
    Project: "Backend api rest social network",
    Version: 1.0,
    Date: new Date(),
  });
});
//rutas
const UserRoutes = require("./routes/user.routes");
const FollowRoutes = require("./routes/follow.routes");
const PublicationRoutes = require("./routes/publication.routes");

app.use("/api", UserRoutes);
app.use("/api", FollowRoutes);
app.use("/api", PublicationRoutes);
//poner server a escuchar
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
