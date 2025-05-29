const nodemailer = require("nodemailer");
require("dotenv").config();

class MailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: "api",
        pass: process.env.MAIL_API_KEY,
      },
    });
  }

  sendActivationMail(email, link) {
    return this.transport.sendMail({
      from: "hello@demomailtrap.co",
      to: "taranov.vlad.1995@gmail.com",
      subject: "Account Activation",
      text: "",
      html: `
        <div>
          <h1>Welcome to Our Service</h1>
          <p>Please click the link below to activate your account:</p>
          <a href="${link}">Activate Account</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
