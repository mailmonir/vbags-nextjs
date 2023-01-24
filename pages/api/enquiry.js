const handler = (req, res) => {
  require("dotenv").config();
  // let nodemailer = require("nodemailer");
  // console.log(process.env.CAPTCHA_SECRET_KEY);

  // if (req.method === "POST") {
  //   try {
  //     fetch("https://www.google.com/recaptcha/api/siteverify", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body.gRecaptchaToken}`,
  //     })
  //       .then((reCaptchaRes) => reCaptchaRes.json())
  //       .then((reCaptchaRes) => {
  //         console.log(
  //           reCaptchaRes,
  //           "Response from Google reCatpcha verification API"
  //         );
  //         if (reCaptchaRes?.score > 0.05) {

  // const transporter = nodemailer.createTransport({
  //   port: 465,
  //   host: "mail.victorbagsbd.com",
  //   auth: {
  //     user: "contactform@victorbagsbd.com",
  //     pass: process.env.MAIL_PASSWORD,
  //   },
  //   secure: true,
  // });

  // const mailData = {
  //   from: "contactform@victorbagsbd.com",
  //   to: req.body.email,
  //   subject: `Message From ${req.body.formData.name}`,
  //   text:
  //     req.body.formData.message + " | Sent from: " + req.body.formData.email,
  //   html: `<div>${req.body.formData.message}</div><p>Sent from: ${req.body.formData.email}</p>`,
  // };

  // transporter.sendMail(mailData, function (err, info) {
  //   if (err) {
  //     res.status(501).json({
  //       status: "failure",
  //       message: "Enquiry submission failed",
  //     });
  //   } else {
  //     res.status(200).json({
  //       status: "success",
  //       message: "Enquiry submitted successfully",
  //     });
  //   }
  // });

  //         } else {
  //           res.status(500).json({
  //             status: "failure",
  //             message: "Google ReCaptcha Failure",
  //           });
  //         }
  //       });
  //   } catch (err) {
  //     res.status(405).json({
  //       status: "failure",
  //       message: "Error submitting the enquiry form",
  //     });
  //   }
  // } else {
  //   res.status(405);
  //   res.end();
  // }

  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.email,
    from: "contactform@victorbagsbd.com",
    subject: `Message From ${req.body.formData.name}`,
    text:
      req.body.formData.message + " | Sent from: " + req.body.formData.email,
    html: `<div>${req.body.formData.message}</div><p>Sent from: ${req.body.formData.email}</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).json({
        status: "success",
        message: "Enquiry submitted successfully",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        status: "success",
        message: "Email sending filed",
      });
    });
};

export default handler;
