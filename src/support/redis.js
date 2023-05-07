// const redis = require('redis');
// const async = require('async');
// const config = require('config');
// const redisConfig = config.get('redis');
// const { uri, port, password } = redisConfig;

// const client = redis.createClient({
//   port,
//   host: uri,
//   password,
// });

// // client.on('error', (err) => {
// //   console.log(`Error ${err}`);
// //   client.quit();
// // });

// client.on('connect', function (error) {
//   if (!error) {
//     console.log('Redis connected successfully!');
//   } else {
//     console.log({ error });
//   }
// });

// redis.RedisClient.prototype.delWildcard = function (key, callback) {
//   client.keys(key, (err, rows) => {
//     console.log('rows', rows, err);
//     async.each(
//       rows,
//       (row, callbackDelete) => {
//         client.del(row, callbackDelete);
//       },
//       client.quit(),
//       callback
//     );
//   });
// };
// module.exports = client;
