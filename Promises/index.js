const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      id: 1,
      name: 'BLACK UHURU',
      day: 'Summer'
    });
    // reject(new Error('Se ha producido un error al leer la Base de Datos'));
  }, 3000);
});
promesa
  .then(result => console.log(result))
  .catch(err => console.log(err.message));
