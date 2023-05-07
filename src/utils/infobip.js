// const axios = require("axios")
// const config = require('config');
// if (!config.has('jwt')) {
//     throw new BadRequestError('sendGridConfig not found!');
// }


// const authorization = async (id, password, number) => {
//     const apiKey = ""
//     const url = "https://dmzx1g.api.infobip.com/sms/2/text/advanced"
//     const body = {
//         "messages": [
//             {
//                 "destinations": [
//                     {
//                         "to": number
//                     }
//                 ],
//                 "from": "Mamastop",
//                 "text": "hello"
//             }
//         ]
//     }

//     const result = axios.post(url, body, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `App ${auth}`
//         },
//     })
//         .then(async (response) => {
//             return response.data
//         }).catch((error) => {
//             return {
//                 status: false,
//                 msg: error
//             }
//         })
// }
