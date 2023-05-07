var CryptoJS = require("crypto-js");
const config = require('config');
if(!config.has('Encryption')){
    throw new Error('Encryption env not found')
}
const Encryption = config.get('Encryption');
const {
    encryptionSecretKey,
  } = Encryption;
  
module.exports.encryptData = (data) => {
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
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return {
        data: ciphertext
    }
    
}