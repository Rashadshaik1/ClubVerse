const axios = require("axios");

const sendEmail = async ({ to, subject, text }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "ClubVerse",
          email: process.env.EMAIL
        },
        to: [
          {
            email: to
          }
        ],
        subject,
        textContent: text
      },
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