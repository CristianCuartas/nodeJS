const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

const artists = [
  { id: 0, name: 'DAMIAN MARLY', day: 'Summer' },
  { id: 1, name: 'SKA-P', day: 'Jamming' },
  { id: 2, name: 'KU-MANI MARLY', day: 'Jamming' },
  { id: 3, name: 'GONDWANA', day: 'Jamming' },
  { id: 4, name: 'ZONA GANJAH', day: 'Jamming' },
  { id: 5, name: 'MORODO', day: 'Jamming' },
  { id: 6, name: 'AL2', day: 'Summer' },
  { id: 7, name: 'DUB IN', day: 'Summer' },
  { id: 8, name: 'MOVIMIENTO ORIGINAL', day: 'Jamming' },
  { id: 9, name: 'MONSIEUR PERINE', day: 'Summer' },
  { id: 10, name: 'SHAMNES', day: 'Jamming' }
];

/*GET */

app.get('/', (req, res) => {
  res.send(200, 'Hello world');
});
app.get('/api/artists/list', (req, res) => {
  res.send([
    'Dub In',
    'Shamanes Crew',
    'Zona Ganjah',
    'Pink Floyd',
    'Damian Marly'
  ]);
});
app.get('/api/artists/id/:id', (req, res) => {
  res.send(req.params.id);
});

app.get('/api/artists/:dia1/:dia2', (req, res) => {
  res.send(req.params);
});

app.get('/api/artists/', (req, res) => {
  res.send(artists);
});
app.get('/api/artists/:name', (req, res) => {
  const artist = artists.find(artist => artist.name === req.params.name);

  if (!artist) {
    res.status(404).send('No se encontro el artista.');
  } else {
    res.send(artist);
  }
});

/*POST */
app.post('/api/artists', (req, res) => {
  const artistId = artists.length;
  const artist = {
    id: artistId,
    name: req.body.name,
    day: req.body.day
  };
  artists.push(artist);
  res.status(201).send(artist);
});

app.post('/api/artists/verified', (req, res) => {
  if (!req.body.name || req.body.day < 3) {
    res.status(400).send('Error en los datos ingresados.');
    return;
  }
  const artistId = artists.length;
  const artist = {
    id: artistId,
    name: req.body.name,
    day: req.body.day
  };
  artists.push(artist);
  res.status(201).send(artist);
});

app.listen(port);
