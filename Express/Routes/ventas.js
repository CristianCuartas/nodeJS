const auth = require("./../Middlwares/AuthJWT");
const admin = require("./../Middlwares/isAdmin");
const express = require("express");
const mongoose = require("mongoose");
const Ventas = require("../Models/Venta");
const Artist = require("../Models/Artists");
const Users = require("../Models/Users");
const router = express.Router();

router.get("/", [auth, admin, authorize([Role.Admin])], async (req, res) => {
  const ventas = await Ventas.find();
  res.send(ventas);
});

router.post(
  "/",
  [auth, authorize([Role.Admin, Role.User])],
  async (req, res) => {
    const user = await Users.findById(req.body.userId);
    if (!user) return res.status(400).send("Usuario no existe.");

    const artist = await Artist.findById(req.body.artistId);
    if (!artist) return res.status(400).send("Artista no existe.");

    const ventas = new Ventas({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      artist: {
        _id: artist._id,
        name: artist.name,
        day: artist.day
      },
      price: req.body.price
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const result = await ventas.save();
      user.isCustomer = true;
      user.save();
      await session.commitTransaction();
      session.endSession();
      res.status(201).send(result);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).send(e.message);
    }
  }
);

module.exports = router;
