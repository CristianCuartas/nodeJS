const http = require('http');

// const server = http.createServer();

// server.on('connection', socket => {
//   console.log('Nueva conexión detectada.');
// });
// server.listen(2012);
// console.log('Escuchando por el puerto 2012');

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.write('Hola mundo desde Node.js ');
//     res.write('Modulo HTTP');
//     res.end();
//   }
//   if (req.url === '/perfil') {
//     res.write('Cristian David Cuartas Hernandez');
//     res.end();
//   }
// });

// server.listen(3030);
// console.log('Escuchando en puerto 3030...');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Typpe': 'text/html' });
  res.write('<h1>Modulo HTTP</h1>');
  res.write('<p><b>Curso Node.js</b></p>');
  res.end();
});

server.listen(8080);
console.log('Escuchando por el puerto 8080');
