const sgMail = require('@sendgrid/mail');
const sendEmail = async (to, subject, text) => {console.log(to);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: process.env.SENDER_EMAIL, // Verified sender email
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully!');
  } catch (err) {
    console.error('Error sending email:', err.response.body.errors);
  }
};

module.exports = sendEmail;
