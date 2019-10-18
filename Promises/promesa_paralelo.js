const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Leyendo datos de base de datos');
    resolve({ amigos: 100, likes: 0 });
  }, 1000);
});

const promesa_2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Leyendo datos de base de datos');
    resolve({ amigos: 100, likes: 50 });
  }, 4000);
});

Promise.all([promesa, promesa_2])
  .then(result => console.log(result))
  .catch(err => console.log(err.message));
