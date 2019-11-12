const express = require('express');
const { Music } = require('../Models/Music');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  const songs = await Music.find();
  res.send(songs);
});

router.get('/:id', async (req, res) => {
  const song = await Music.findById(req.params.id);
  if (!song)
    return res.status(404).send('No se encontro ninguna canción con ese ID');
  res.send(song);
});

/*POST */

router.post(
  '/',
  [check('name').isString(), check('genero').isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const music = new Music({
      name: req.body.name,
      genero: req.body.genero
    });
    const result = await music.save();
    res.status(201).send(result);
  }
);

/* PUT */
router.put(
  '/:id',
  [check('name').isString(), check('genero').isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const music = await Music.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        ganero: req.body.genero
      },
      { new: true }
    );
    if (!music) {
      return res
        .status(404)
        .send('La canción con el ID introducido no existe.');
    }
    res.status(200).send();
  }
);

/* DELETE */
router.delete('/:id', async (req, res) => {
  const music = await Music.findByIdAndDelete(req.params.id);
  if (!music) {
    return res.status(404).send('La canción con el ID introducido no existe.');
  }
  res.status(204).send('Canción eliminada');
});

module.exports = router;
