const mongoose = require('mongoose');
const musicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  genero: String,
  date: { type: Date, default: Date.now }
});

const Music = mongoose.model('music', musicSchema);

module.exports.Music = Music;
module.exports.musicSchema = musicSchema;
