const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const myOAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

exports.transport = async () => {
  try {
    const accessToken = await myOAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_SENDER, //your gmail account you used to set the project up in google cloud console"
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,

        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.mailOptions = (sendTo, code) => {
  return {
    from: process.env.EMAIL_SENDER, // sender
    to: sendTo, // receiver
    subject: "Reset Password Cinemnar", // Subject
    html: `<p>Here is your reset code <b>${code}</b></p>`, // html body
  };
};
