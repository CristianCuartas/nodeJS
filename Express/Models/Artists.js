const mongoose = require('mongoose');
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  day: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  integrantes: {
    type: Number,
    required: true,
    uppercase: true,
    trim: true
  },
  albums: {
    type: Number,
    required: true,
    uppercase: true,
    trim: true
  },
  origen: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  extras: [String],
  boletas: {
    boleta_day_summer: { type: Number, default: 300000 },
    boleta_day_jamming: { type: Number, default: 300000 },
    boleta_combo: { type: Number, default: 580000 }
  },
  date: { type: Date, default: Date.now }
});
const Artist = mongoose.model('artist', artistSchema);

module.exports = Artist;
