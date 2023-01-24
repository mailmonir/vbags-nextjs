export default function contactFormApi(req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "mail.victorbagsbd.com",
    auth: {
      user: "contactform@victorbagsbd.com",
      pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: "contactform@victorbagsbd.com",
    to: req.body.email,
    subject: `Message From ${req.body.formData.name}`,
    text:
      req.body.formData.message + " | Sent from: " + req.body.formData.email,
    html: `<div>${req.body.formData.message}</div><p>Sent from: ${req.body.formData.email}</p>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      console.log(info);
      res.send("success");
    }
  });
}
