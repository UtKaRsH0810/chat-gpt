require('dotenv').config();
const ShortUniqueId = require('short-unique-id');
const { Op } = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const stringFormatter = (string) => {
  string = string.replace(/\s+/g, ' ').trim().toLowerCase();
  return string.replace(string[0], string[0].toUpperCase());
};

const generateUniqueId = async () => {
  const firstHalf = new ShortUniqueId({
    length: 4,
    dictionary: 'alpha_upper',
  });
  const secondHalf = new ShortUniqueId({ length: 4, dictionary: 'number' });
  const thirdHalf = new ShortUniqueId({
    length: 4,
    dictionary: 'alpha_upper',
  });
  return `MSCUS-${firstHalf()}${secondHalf()}${thirdHalf()}`;
};

const generatePassword = async ({ name, mobile_number }) => {
  mobile_number = mobile_number.trim();
  let password = `${name.trim().split(' ')[0]}@${mobile_number.substring(
    mobile_number.length - 4,
    mobile_number.length
  )}`;
  return password;
};

async function generateId() {
  const firstHalf = new ShortUniqueId({ length: 2, dictionary: 'alpha_upper' });
  const secondHalf = new ShortUniqueId({ length: 2, dictionary: 'number' });
  const thirdHalf = new ShortUniqueId({ length: 2, dictionary: 'alpha_upper' });
  return `MSCON-${firstHalf()}${secondHalf()}${thirdHalf()}`;
}

module.exports = {
  generateUniqueId,
 generateId,
 generatePassword
};
