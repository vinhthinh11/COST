const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Nguyen Vinh Thinh <${process.env.EMAIL_FROM}>`;
  }

  createEmailTransport() {
    if (process.env.NODE_ENV === 'production') {
      // this place for setting sendGrid
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(templates, subject) {
    // 1> render HTML from pug templates
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${templates}.pug`,
      { firstName: this.firstName, url: this.url, subject }
    );
    // 2> define email option
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // 3> create transport and send the email
    await this.createEmailTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    return this.send('welcome', 'Welcome to our website, hope you enjoy it');
  }

  async sendResetPassword() {
    return this.send('resetPassword', 'Reset your password');
  }
};
