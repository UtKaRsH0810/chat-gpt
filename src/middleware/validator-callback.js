const encryptData = require('./encrypt').encryptData
const decryptData = require('./decrypt').decryptData
const config = require('config');
const Environment = config.get('Environment');
const {
  environmentKey,
} = Environment;
module.exports = (validator) => (req, res, next) => {

        let httpRequest = {}
        if(environmentKey === 'production') {
        const decryptedData = decryptData(req.body.encryptedData).decryptedData
        console.log("decryptedData1")
        console.log(decryptedData)
            httpRequest = {
                body: decryptedData,
                query: req.query,
                params: req.params,
            };
        } else {
            httpRequest = {
                body: req.body,
                query: req.query,
                params: req.params,
            };
        }
    const { error } = validator(httpRequest);
    if (error) throw new BadRequestError(error.message);
    return next();
};
