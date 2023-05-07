// const aws = require("aws-sdk");
// const multerS3 = require("multer-s3");
// const multer = require("multer");
// var maxCount = 5;
// const {aws:awsConfig}=require('config');
// if (!awsConfig) {
//     throw new BadRequestError('aws config not found!')
// }
  
// const {accessKeyId,secretAccessKey,ticket_bucket,signatureVersion,region}=awsConfig;

// const s3 = new aws.S3({
//     accessKeyId,
//     secretAccessKey,
//     Bucket: ticket_bucket,
//     signatureVersion,
//     // useAccelerateEndpoint: true,
//     region
// });

// module.exports.fileUploadFunc = async (req, res) => {

//     const upload_file = multer({
//         storage: multerS3({
//             s3: s3,
//             acl: "public-read",
//             bucket: ticket_bucket,
//             contentType: multerS3.AUTO_CONTENT_TYPE,
//             metadata: function (req, file, cb) {
//                 console.log('callback', req, file);
//                 cb(null, { fieldName: file.fieldname });
//             },
//             key: function (req, file, cb) {
//                 var extension = "ticket" + "_" + Date.now() + file.originalname
//                 cb(null, extension);
//             }
//         })
//     });

//     return new Promise(async function (resolve, reject) {
//         try {
            
//             upload_file.array("images", maxCount)(req, res, function (error) {
//                 if (error) {
//                     console.log({ error });
//                     reject(error);
//                 } else {
//                     console.log('[REQ FILES]', req.files);
//                     if(req.files && req.files.length!=0) {
//                         const { key, location } = req.files[0];
//                         let images=req.files;  
//                         images=images.map(image=>image.location);
//                         req.body={...req.body,attachmentUrls:images};
//                     } 
//                     resolve(true)
//                 }
//             });
            
//         } catch (e) {
//             reject(e);
//         }
//     });
// };

