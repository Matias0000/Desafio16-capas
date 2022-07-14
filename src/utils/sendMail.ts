import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
import Mail from 'nodemailer/lib/mailer';

const auth = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD,
};

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth,
});

export const sendMail = async (options: Mail.Options) => {
  try {
    const info = await transporter.sendMail(options);

    //   console.log({ info });

    return info;
  } catch (err) {
    console.log(err);
  }
};
