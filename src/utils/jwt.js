const jwt = require('jsonwebtoken');
const config = require('config');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const publicSecret = fs.readFileSync(
  path.join(__dirname, 'certs', 'public.pem'),
  'utf-8'
);
const privateSecret = fs.readFileSync(
  path.join(__dirname, 'certs', 'private.pem'),
  'utf-8'
);

if (!config.has('jwt')) {
  throw new BadRequestError('sendGridConfig not found!');
}

const { jwtSecretKey, refreshSessionTimeout, sessionTimeout } =
  config.get('jwt');

function sign(payload, isRefreshToken) {
  try {
    console.log('process.env.REFERESH_SESSION_TIMEOUT');
    console.log(refreshSessionTimeout);
    console.log(sessionTimeout);

    const token = jwt.sign(payload, privateSecret, {
      expiresIn: isRefreshToken ? refreshSessionTimeout : sessionTimeout,

      algorithm: 'RS256',
    });
    return token;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function verify(payload) {
  try {
    return jwt.verify(payload, publicSecret);
  } catch (err) {
    throw err;
  }
}

function verifyHashPassword({ password, hashPassword }) {
  return bcrypt.compare(password, hashPassword);
}

module.exports = {
  sign,
  verify,
  verifyHashPassword,
};
