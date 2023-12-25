import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendmail = async (receiver, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: receiver,
      subject: subject,
      // text: "Hello world?",
      html: `<div>${text}</div>`,
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

export default sendmail;
