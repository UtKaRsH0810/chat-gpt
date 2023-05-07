let fs = require('fs');
let util = require('util');

fs.writeFile('log.txt', '', function () {
  console.log('done');
});

let logFile = fs.createWriteStream('log.txt', { flags: 'a' });
// Or 'w' to truncate the file every time the process starts.
let logStdout = process.stdout;
console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
};
console.error = console.log;
const http = require('http');
const app = require('./src/app');
const chalk = require('chalk');
const figlet = require('figlet');

const { normalizePort } = require('./src/utils');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '5000');

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
  console.log(
    chalk.green(
      figlet.textSync('CHAT-GPT', {
        font: 'Bulbhead',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );

  console.log(
    '---------------------------------------------------------------------'
  );
  console.log('Time : ' + new Date());
  console.log('-------------Current Environment Name ------------------ ');
  console.log(process.env.NODE_ENV);
  console.log(
    '----------------------------------------------------------------------'
  );
}
