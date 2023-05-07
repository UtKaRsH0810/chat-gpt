const encryptData = require('./encrypt').encryptData;
const decryptData = require('./decrypt').decryptData;
const config = require('config');
const Environment = config.get('Environment');
const { environmentKey } = Environment;
module.exports = (controller) => async (req, res) => {
  let httpRequest = '';
  let encryptedData = '';
  console.log('req.body');
  console.log(req.body);
  // console.log(decryptData(req.body.encryptedData))
  if (environmentKey === 'production') {
    const decryptedData = decryptData(req.body.encryptedData).decryptedData;
    httpRequest = {
      body: decryptedData,
      query: req.query,
      files: req.files,
      file: req.file,
      params: req.params,
      ip: req.ip,
      method: req.method,
      files: req.files,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Authorization: req.get('Authorization'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
      user: req.user,
      paginate: req.paginate,
    };
  } else {
    httpRequest = {
      body: req.body,
      query: req.query,
      files: req.files,
      file: req.file,
      params: req.params,
      ip: req.ip,
      method: req.method,
      files: req.files,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Authorization: req.get('Authorization'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
      user: req.user,
      paginate: req.paginate,
    };
  }

  // --------------- decode ---------------
  // const decryptedRequest = decryptData(httpRequest)
  // console.log("decryptedRequest")
  // console.log(decryptedRequest)
  const httpResponse = await controller(httpRequest);

  if (environmentKey != 'production') {
    encryptedData = httpResponse.body;
  } else {
    encryptedData = encryptData(httpResponse.body);
  }
  // if (httpResponse.headers) {
  //     res.set(httpResponse.headers);
  //     httpResponse.body.data.xlsx.write(httpResponse)
  //     return res.status(httpResponse.statusCode).end();
  // }

  if (httpResponse.headers) res.set(httpResponse.headers);
  return res.status(httpResponse.statusCode).send(encryptedData);
};
