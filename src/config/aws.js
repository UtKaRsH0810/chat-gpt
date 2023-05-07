// const AWS = require('aws-sdk');
// const config = require('config');
// if(!config.has('aws')) {
//     throw new BadRequestError('awsConfig not found!');
// };

// const awsConfig = config.get('aws');

// AWS.config.update({
//     accessKeyId: awsConfig.accessKeyId,
//     secretAccessKey: awsConfig.secretAccessKey
// });

// const s3 = new AWS.S3();

// module.exports = { s3 };