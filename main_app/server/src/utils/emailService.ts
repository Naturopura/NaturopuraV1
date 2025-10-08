import nodemailer from 'nodemailer';
import { welcomeEmailTemplate } from '../template/WelcomeTemplate';
import dotenv from 'dotenv';
dotenv.config();


dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendRegistrationEmail = async (to: string, name: string) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: 'Welcome to AgriPlatform!',
    html: welcomeEmailTemplate(name)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending registration email:', error);
  }
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};