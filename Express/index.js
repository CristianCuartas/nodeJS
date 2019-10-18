const express = require('express');
const app = express();
const artist = require('./Routes/artists');
const DateRequest = require('./Middlwares/DateRequest');
const RequestType = require('./Middlwares/RequestType');
const morgan = require('morgan');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/artists', artist);
app.listen(port);

/*Middlwares*/
app.use(morgan('tiny'));
app.use(DateRequest);
app.use(RequestType);
