const mongoose = require("mongoose");
const express = require("express");
const app = express();
const artist = require("./Routes/artists");
const user = require("./Routes/user");
const auth = require("./Routes/auth");
const music = require("./Routes/music");
const ventas = require("./Routes/ventas");
const DateRequest = require("./Middlwares/DateRequest");
const RequestType = require("./Middlwares/RequestType");
const morgan = require("morgan");
const port = process.env.PORT || 9090;

app.use(express.json());
app.use("/api/artists", artist);
app.use("/api/user", user);
app.use("/api/music", music);
app.use("/api/ventas", ventas);
app.use("/api/auth", auth);

app.listen(port, () => console.log(`Escuchando por el puerto: ${port}`));
// console.log(process.env.SECRET_KEY_JWT_API);
mongoose
  .connect("mongodb://localhost/JammingFestival", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch(() => console.log("Error al conectar a MongoDB"));

/*Middlwares*/
app.use(morgan("tiny"));
app.use(DateRequest);
app.use(RequestType);
