require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

function createMessage(...content) {
  const messageInfo = {
    from: '<smartbrain.io@invalidmail.com> SmartBrain',
    subject: "Password Reset at SmartBrain App",
    passwordResetText: "Hi! You have requested reset password for your SmartBrain App account. Press the link below. If you did not make this request, please ignore this email.",
    blankEmailText: "Hi! You or someone else have requested reset password at SmartBrain App account for this email. However, this email address is not in our database of registered users and therefore password reset request has failed. If you are the SmartBrain App user and were expecting this email, please try again using email you gave when opening your account. Otherwise, please ignore this email."
  }
  const userEmail = content[0];
  const link = content[1];
  
  return transporter.sendMail({
    from: messageInfo.from,
    to: userEmail,
    subject: messageInfo.subject,
    text: link? `${messageInfo.passwordResetText} Link: ${link}`: `${messageInfo.blankEmailText}`,
    html: "",
  })
}

module.exports = {
  createMessage: createMessage,
}