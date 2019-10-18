function getArtist(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Obteniendo artista de la base de datos');
      resolve({ id: 23, name: 'BLACK UHURU', day: 'Summer' });
    }, 3000);
  });
}
function getInfoArtist(name) {
  return new Promise((resolve, reject) => {
    console.log('Obteniendo info de la base de datos');
    resolve({ integrantes: 10, albums: 10, origen: 'Kingston, Jamaica' });
  });
}

const promesa = getArtist(23);
// promesa.then(artista => console.log(artista)).catch(err => console.log(err));
promesa
  .then(artista => getInfoArtist(artista.name))
  .then(info => console.log(info))
  .catch(error => console.log(error));

async function showArtist() {
  try {
    const artist = await getArtist(23);
    const infoArtist = await getInfoArtist(artist.name);
    console.log(infoArtist);
  } catch (err) {
    console.log(err.message);
  }
}
showArtist();
