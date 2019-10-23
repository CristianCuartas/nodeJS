const mongoose = require('mongoose');
const express = require('express');
const Artists = require('../Models/Artists');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  const artists = await Artists.find();
  res.send(artists);
});

router.get('/:id', async (req, res) => {
  const artist = await Artists.findById(req.params.id);
  if (!artist)
    return res.status(404).send('No se encontro ningún artista con ese ID');
  res.send(artist);
});

/*POST */

router.post(
  '/',
  [
    check('name').isString(),
    check('day').isString(),
    check('integrantes').isNumeric(),
    check('albums').isNumeric(),
    check('origen').isString(),
    check('extras').isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const artist = new Artists({
      name: req.body.name,
      day: req.body.day,
      integrantes: req.body.integrantes,
      albums: req.body.albums,
      origen: req.body.origen,
      extras: req.body.extras
    });
    const result = await artist.save();
    res.status(201).send(result);
  }
);

/* PUT */
router.put(
  '/:id',
  [
    check('name').isString(),
    check('day').isString(),
    check('integrantes').isNumeric(),
    check('albums').isNumeric(),
    check('origen').isString(),
    check('extras').isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const artist = await Artists.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        day: req.body.day,
        integrantes: req.body.integrantes,
        albums: req.body.albums,
        origen: req.body.origen,
        extras: req.body.extras
      },
      { new: true }
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
router.delete('/:id', async (req, res) => {
  const artist = await Artists.findByIdAndDelete(req.params.id);
  if (!artist) {
    return res.status(404).send('El artista con el ID introducido no existe.');
  }
  res.status(204).send('Artista eliminado');
});

module.exports = router;
