const axios = require("axios");

const sendEmail = async ({ to, subject, text, html }) => {
  try {

    // Support single email or multiple emails
    const recipients = Array.isArray(to)
      ? to.map(email => ({ email }))
      : [{ email: to }];

    const payload = {
      sender: {
        name: "ClubVerse",
        email: process.env.EMAIL
      },
      to: recipients,
      subject
    };

    if (html) {
      payload.htmlContent = html;
    } else {
      payload.textContent = text;
    }

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      payload,
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Brevo Email Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = sendEmail;