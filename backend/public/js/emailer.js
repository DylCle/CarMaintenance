const nodemailer = require('nodemailer');
const sendMail = (sendTo, mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'newrussianguy12@gmail.com', // gitignore
          pass: 'qswarundmlihiyub' //gitignore
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