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
  boletas: {
    boleta_day_summer: { type: Number, default: 160000 },
    boleta_day_jamming: { type: Number, default: 160000 },
    boleta_combo: { type: Number, default: 280000 }
  },
  date: { type: Date, default: Date.now }
});

const Artist = mongoose.model('artist', artistSchema);

deleteArtist('5daa213f6e03cc3ad0168156');
async function deleteArtist(id) {
  const result = await Artist.deleteOne({ _id: id });
  console.log(result);
}
// updateArtist_2('5da9d12c3f2c5534681f5d30');
async function updateArtist_2(id) {
  const result = await Artist.update(
    { _id: id },
    {
      $set: {
        integrantes: 1
      }
    }
  );
  console.log(result);
}

// updateArtist('5da9d12c3f2c5534681f5d30');
async function updateArtist(id) {
  const artist = await Artist.findById(id);
  if (!artist) return;
  const boletas = artist.boletas;
  boletas.boleta_day_jamming = 170000;
  boletas.boleta_day_summer = 170000;
  boletas.boleta_combo = 300000;
  const result = await artist.save();
  console.log(result);
}

// getPaginationArtist();
async function getPaginationArtist() {
  const pageNumber = 1;
  const pageSize = 1;

  const artist = await Artist.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  console.log(artist);
}

// getCountArtist();
async function getCountArtist() {
  const artist = await Artist.find().count();
  console.log(artist);
  /*.count() => cuenta el número de registros*/
}

// getFilterNumberIntegrants();
async function getFilterNumberIntegrants() {
  const integrants = await Artist.find({ integrantes: { $gte: 5 } });
  console.log(integrants);
}

// getInfoBoletas();
async function getInfoBoletas() {
  const boletas = await Artist.find(
    {},
    'boletas.boleta_day_summer boletas.boleta_day_jamming boletas.boleta_combo'
  ).limit(1);
  console.log(boletas);
}

// getInfoArtista();
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
  const artist = await Artist.find(
    {
      day: 'JAMMING'
    },
    'day name boletas.boleta_day_jamming boletas.boleta_combo'
  );
  console.log(artist);
}
// getInfoSummerDay();
async function getInfoSummerDay() {
  const artist = await Artist.find(
    {
      day: 'SUMMER'
    },
    'day name boletas.boleta_day_summer boletas.boleta_combo'
  );
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
    name: '',
    day: '',
    integrantes: 0,
    albums: 0,
    origen: ', '
  });
  const result = await artist.save();
  console.log(result);
}
