const nodemailer = require('nodemailer');
require('dotenv').config();
const sendMail = (sendTo, mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
      });

      const modifiedMailOptions = {
        ...mailOptions,
        to: sendTo
      };

      return new Promise((resolve, reject) => {
        transporter.sendMail(modifiedMailOptions, function (error, info) {
            if(error) {
                reject(error)
            } else {
                resolve(info);
            }
        });
      });
};

module.exports = {
    nodemailer,
    sendMail
  };