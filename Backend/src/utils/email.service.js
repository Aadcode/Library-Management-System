import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Welcome_Email } from "../constant.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

const sendEmail = async (recipientEmail, username) => {
  try {
    const emailtemplate = Welcome_Email(username);
    console.log(emailtemplate);
    await transporter.sendMail({
      to: recipientEmail,
      from: "aadarshjain1920@gmail.com", // Your verified sender email in SendGrid
      subject: "Test Email from My App",
      subject: "Welcome to ReadBite!",
      html: `${emailtemplate}`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
