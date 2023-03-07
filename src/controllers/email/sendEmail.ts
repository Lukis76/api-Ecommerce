import nodemailer from "nodemailer";
import { CError } from "../../utils/err";

type TSendEmail = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendEmail = async (data: TSendEmail) => {
  // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_ID, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });

    transporter
      .verify()
      .then(() => console.log("Ready for send emails"))
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });

    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Fred Foo 👻" <ecommer.eclipce@gmail.com>', // sender address
      to: "kiu.manoguerra@gmail.com", // data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.html, // html body
    });
  } catch (err) {
    throw CError(err, "forget pass token user");
  }
};
