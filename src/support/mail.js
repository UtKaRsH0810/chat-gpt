// const nodemailer = require('nodemailer');
// const sgTransport = require('nodemailer-sendgrid-transport');
// const config = require('config');

// module.exports = async function ({ to, subject, message }) {
//   try {
//     let transporter = nodemailer.createTransport(
//       sgTransport({
//         auth: {
//           api_key: process.env.SENDGRID_KEY,
//         },
//       })
//     );
//     const mailedBack = await transporter.sendMail({
//       to,
//       from: process.env.MAIL_SENDER,
//       subject: subject,
//       text: `${message}`,
//     });
//     return mailedBack.message;
//   } catch (err) {
//     throw err;
//   }
// };
