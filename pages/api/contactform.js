import axios from "axios";

async function sendEmail(req, res) {
  console.log(req.body);
  if (req.method === "POST") {
    const { data } = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        secret: process.env.CAPTCHA_SECRET_KEY,
        response: req.body.token,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (data.score >= 0.5) {
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

      const msg = {
        to: req.body.email,
        from: "contactform@victorbagsbd.com",
        subject: `Message From ${req.body.formData.name}`,
        text:
          req.body.formData.message +
          " | Sent from: " +
          req.body.formData.email,
        html: `<div>${req.body.formData.message}</div><p>Sent from: ${req.body.formData.email}</p>`,
      };

      transporter.sendMail(msg, (err, info) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err: err });
        } else {
          console.log(info);
          res.status(200).json({ success: info });
        }
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "HCaptcha Failure",
      });
    }
  } else {
    res.status(405);
    res.end();
  }
}

export default sendEmail;
