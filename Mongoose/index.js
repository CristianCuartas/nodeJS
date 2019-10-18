const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/jamming2020', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(() => console.log('Error al conectar a MongoDB'));

const artistSchema = new mongoose.Schema({
  name: String,
  day: String,
  integrantes: Number,
  albums: Number,
  origen: String,
  boleta_day_summer: { type: Number, default: 160000 },
  boleta_day_jamming: { type: Number, default: 160000 },
  boleta_combo: { type: Number, default: 280000 },
  date: { type: Date, default: Date.now }
});

const Artist = mongoose.model('artist', artistSchema);

getInfoArtista();
async function getInfoArtista() {
  const artist = await Artist.find({
    name: 'ZONA GANJAH'
  }).select({
    name: 'ZONA GANJAH',
    day: 'JAMMING',
    integrantes: 6,
    albums: 11,
    origen: 'Antofagasta, Chile'
  });
  /*.select({}) => Asiganmos que campos son los que queremos mostrar.*/
  console.log(artist);
}
// getInfoJammingDay();
async function getInfoJammingDay() {
  const artist = await Artist.find({
    day: 'JAMMING',
    boleta_day_jamming: 160000,
    boleta_combo: 280000
  });
  console.log(artist);
}

// getArtistas();
async function getArtistas() {
  const artist = await Artist.find();
  console.log(artist);
}

// agregarArtista();
async function agregarArtista() {
  const artist = new Artist({
    name: 'DAMIAN MARLY',
    day: 'JAMMING',
    integrantes: 1,
    albums: 7,
    origen: 'Kingston, Jamaica'
  });
  const result = await artist.save();
  console.log(result);
}
