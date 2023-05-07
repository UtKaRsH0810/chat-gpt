var CryptoJS = require("crypto-js");
const config = require('config');
const Encryption = config.get('Encryption');
const {
    encryptionSecretKey,
  } = Encryption;

module.exports.decryptData = (data) => {
    // if(typeof(data) === object) {
    //     var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 1234').toString();
    //     return {
    //         status: true,
    //         encryptedData: ciphertext
    //     }
    // } else {
    //     return {
    //         status: false
    //     }
    // }
    var secretKey = encryptionSecretKey
    var bytes  = CryptoJS.AES.decrypt(data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log("decryptedData is")
    // console.log(decryptedData)
    return {
        decryptedData
    }
    
}