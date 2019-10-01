/* Código para llevar un conteo de días */

const start = new Date(2019, 08, 15);
const end = new Date(2019, 09, 28);

const miliSegundosDia = 24 * 60 * 60 * 1000;

const result = (end - start) / miliSegundosDia;

console.log(result);

/* El error del código esta en qué toca tener en cuenta que algunos años tienen más días que otros */

/* Ejemplo: */

const inicio = new Date(2015, 02, 01);
const fin = new Date(2015, 03, 01);

const resultado = (fin - inicio) / miliSegundosDia;

const exactTime = (num1, num2, divisor) => {
  return (num2 - num1) / divisor;
};

console.log(exactTime(inicio, fin, miliSegundosDia));

/* Utilizar el paquete de npm  d3-time*/

const d3 = require('d3-time');

const resultado_npmLibrary = d3.timeDay.count(inicio, fin);
console.log(resultado_npmLibrary);
