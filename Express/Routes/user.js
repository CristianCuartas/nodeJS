const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const User = require('../Models/Users');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send('No se encontro ningún usuario con ese ID');
  res.send(user);
});

/*POST */

router.post(
  '/',
  [
    check('name').isString(),
    check('isCustomer').isBoolean(),
    check('email').isString(),
    check('password').isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('Ese usuario ya existe.');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      isCustomer: false
    });
    const result = await user.save();
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  }
);

/* PUT */
router.put(
  '/:id',
  [
    check('name').isString(),
    check('isCustomer').isBoolean(),
    check('email').isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isCustomer: req.body.isCustomer
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .send('El usuario con el ID introducido no existe.');
    }
    res.status(200).send();
  }
);

/* DELETE */
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send('El usuario con el ID introducido no existe.');
  }
  res.status(204).send('Usuario eliminado');
});

module.exports = router;
