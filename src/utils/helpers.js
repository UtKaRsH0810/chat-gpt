require('dotenv').config();
const ShortUniqueId = require('short-unique-id');
const { Op } = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const config = require('config');
// const sendGridConfig = config.get('sendGridConfig');

// if (!config.has('sendGridConfig')) {
//   throw new BadRequestError('sendGridConfig not found!');
// }




// const { apiKey, senderEmail } = sendGridConfig;






async function getTransactionId() {
  const firstHalf = new ShortUniqueId({ length: 4, dictionary: 'alpha_upper' });
  const secondHalf = new ShortUniqueId({ length: 4, dictionary: 'number' });
  const thirdHalf = new ShortUniqueId({ length: 4, dictionary: 'alpha_upper' });
  const fourthHalf = new ShortUniqueId({ length: 4, dictionary: 'number' });
  return `${firstHalf()}${secondHalf()}${thirdHalf()}`;
}


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const fileFilterForContactUsForm = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'video/quicktime' ||
    file.mimetype === 'image/heic' ||
    file.mimetype === 'image/heif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const newpPath = path.join(__dirname, '/images');
    fs.mkdirSync(newpPath, { recursive: true });
    cb(null, newpPath);
    // cb(null, path.join(__dirname, '/images'))
  },
  // filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9 + 'nui')
  //   cb(null, file.fieldname + '-' + uniqueSuffix)
  // }
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});



// const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 3 * 1024 * 1024  }})
const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadContact = multer({
  storage: storage,
  fileFilter: fileFilterForContactUsForm,
});




const sendEmail = async function ({receiver, subject, html}) {
  const transporter = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: apiKey,
      },
    })
  );
  const mailedBack = await transporter.sendMail({
    to: receiver,
    from: 'MamaStop <hey@mamastop.com>',
    subject: subject,
    html: `
          ${html}
  `,
  });
  console.log(mailedBack.message);
  return mailedBack.message;
};




const sendCCEmail = async function ({receiver, ccArray, subject, html}) {
  const transporter = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: apiKey,
      },
    })
  );
  const mailedBack = await transporter.sendMail({
    to: receiver,
    from: senderEmail,
    subject: subject,
    cc: ccArray,
    html: `
          ${html}
  `,
  });
  console.log(mailedBack.message);
  return mailedBack.message;
};


async function updateValues({ previousData, newData }) {
  for (const key in newData) {
    previousData[key] = newData[key];
  }
  return await previousData.save();
}

module.exports = {
  getTransactionId,
  upload,
  uploadContact,
  sendEmail,
  sendCCEmail,
  updateValues,
};
