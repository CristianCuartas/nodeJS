const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/validaciones', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(() => console.log('Error al conectar a MongoDB'));

const validacionesSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 99,
    enum: ['BMW', 'AUDI']
  },
  model: String,
  sold: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.sold;
    }
  },
  year: {
    type: Number,
    min: 2000,
    max: 2030,
    get: y => Math.round(y)
  },
  extras: [String],
  date: { type: Date, default: Date.now }
});

const Validator = mongoose.model('validation', validacionesSchema);

validacion_1();

async function validacion_1() {
  const validation = new Validator({
    company: 'BMW',
    model: 'X7',
    price: 6000,
    year: 2019,
    sold: true,
    extras: ['4*4']
  });
  try {
    const result = await validation.save();
    console.log(result);
  } catch (e) {
    console.group(e.message);
  }
}
