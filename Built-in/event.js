const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('event', function() {
  console.log('Un evento ha ocurrido...');
});

emitter.emit('event');

emitter.on('eventWithArgument', function(arg) {
  console.log(
    'Un evento con los siguientes argumentos ha ocurrido: ',
    arg.ip,
    ' ',
    arg.numero
  );
});

emitter.emit('eventWithArgument', { ip: 192.168, numero: 09 });

/*Arrow function */

emitter.on('eventArrow', arg => {
  console.log('Un evento con arrow function ha ocurrido:', arg.arrowFunc);
});

emitter.emit('eventArrow', { arrowFunc: '() => {}' });
