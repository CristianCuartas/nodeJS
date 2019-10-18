const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
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
router.get('/list', (req, res) => {
  res.send([
    'Dub In',
    'Shamanes Crew',
    'Zona Ganjah',
    'Pink Floyd',
    'Damian Marly'
  ]);
});
router.get('/id/:id', (req, res) => {
  res.send(req.params.id);
});

router.get('/:dia1/:dia2', (req, res) => {
  res.send(req.params);
});

router.get('/', (req, res) => {
  res.send(artists);
});
router.get('/:name', (req, res) => {
  const artist = artists.find(artist => artist.name === req.params.name);

  if (!artist) {
    res.status(404).send('No se encontro el artista.');
  } else {
    res.send(artist);
  }
});

/*POST */
router.post('/', (req, res) => {
  const artistId = artists.length;
  const artist = {
    id: artistId,
    name: req.body.name,
    day: req.body.day
  };
  artists.push(artist);
  res.status(201).send(artist);
});

router.post('/verified', (req, res) => {
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

router.post(
  '/verified2',
  [check('name').isString(), check('day').isString()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const artistId = artists.length;
    const artist = {
      id: artistId,
      name: req.body.name,
      day: req.body.day
    };
    artists.push(artist);
    res.status(201).send(artist);
  }
);

/* PUT */
router.put(
  '/:id',
  [check('name').isString(), check('day').isString()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const artist = artists.find(
      artist => artist.id === parseInt(req.params.id)
    );
    if (!artist) {
      return res
        .status(404)
        .send('El artista con el ID introducido no existe.');
    }
    artist.name = req.body.name;
    artist.day = req.body.day;

    res.status(200).send();
  }
);

/* DELETE */
router.delete('/:id', (req, res) => {
  const artist = artists.find(artist => artist.id === parseInt(req.params.id));
  if (!artist) {
    return res.status(404).send('El artista con el ID introducido no existe.');
  }
  const index = artists.indexOf(artists);
  artists.splice(index, 1);
  res.status(204).send('Artista eliminado');
});

module.exports = router;
