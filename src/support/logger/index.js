const { createLogger, format, transports } = require('winston');
const log = require('./console-logger');

const logToFile = createLogger({
  transports: [
    new transports.File({
      json: true,
      maxFiles: 5,
      level: 'info',
      colorize: true,
      filename: `logs/error.log`,
      maxsize: 52000000, // 52MB
    }),
  ],
});

const logFormatter = format.printf((info) => {
  const { timestamp, level, stack, message } = info;
  const errorMessage = stack || message;
  return `${timestamp} ${level}: ${errorMessage}`;
});

const logToConsole = createLogger({
  level: 'info',
  format: format.errors({ stack: true }),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp(),
        logFormatter
      ),
    }),
  ],
});

module.exports = {
  log,
  logToFile,
  logToConsole,
};
