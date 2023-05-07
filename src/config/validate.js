const test = require('./test');

const production = require('./production');

let fileName;


const validateFunc = (myObject) => {
  const keys = Object.keys(myObject);

  keys.map((key) => {
    if (
      typeof myObject[key] === 'object' &&
      myObject[key] != null &&
      !Array.isArray(myObject[key])
    ) {
      validateFunc(myObject[key]);
    } else if (typeof myObject[key] === 'undefined') {
      // console.log('add this key', key, myObject.constructor.name);

      throw new Error(
        `Please add ------ ${key} ------- key in ------ ${fileName} ------ variable file`
      );
    }
  });
};

if (process.env.NODE_ENV === 'test') {
  fileName = 'test';
  validateFunc(test);
} else if (process.env.NODE_ENV === 'production') {
  fileName = 'production';
  validateFunc(production);
}
