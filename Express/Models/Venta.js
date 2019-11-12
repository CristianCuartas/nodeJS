const mongoose = require('mongoose');
const ventaSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: String,
      email: String
    }),
    required: true
  },
  artist: {
    type: new mongoose.Schema({
      name: String,
      day: String
    }),
    required: true
  },
  price: Number,
  date: { type: Date, default: Date.now }
});

const Venta = mongoose.model('venta', ventaSchema);
module.exports = Venta;
