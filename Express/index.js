const mongoose = require('mongoose');
const express = require('express');
const app = express();
const artist = require('./Routes/artists');
const DateRequest = require('./Middlwares/DateRequest');
const RequestType = require('./Middlwares/RequestType');
const morgan = require('morgan');
const port = process.env.PORT || 9090;

app.use(express.json());
app.use('/api/artists', artist);
// app.listen(port);

app.listen(port, () => console.log(`Escuchando por el puerto: ${port}`));
mongoose
  .connect('mongodb://localhost/JammingFestival', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(() => console.log('Error al conectar a MongoDB'));

/*Middlwares*/
app.use(morgan('tiny'));
app.use(DateRequest);
app.use(RequestType);
