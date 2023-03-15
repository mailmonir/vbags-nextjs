import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(req, res) {
  if (req.method === "POST") {
    // try {
    //   fetch("https://hcaptcha.com/siteverify", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: `secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${req.body.token}`,
    //   })
    //     .then((hCaptchaRes) => hCaptchaRes.json())
    //     .then((hCaptchaRes) => {
    //       console.log(hCaptchaRes, "Response from hCaptcha  verification API");
    //       if (hCaptchaRes?.success === true) {
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
        req.body.formData.message + " | Sent from: " + req.body.formData.email,
      html: `<div>${req.body.formData.message}</div><p>Sent from: ${req.body.formData.email}</p>`,
    };
    // sendgrid
    //   .send(msg)
    //   .then(() => {
    //     return res.status(200).json({ error: "" });
    //   })
    //   .catch(() => {
    //     return res
    //       .status(error.statusCode || 500)
    //       .json({ error: error.message });
    //   });

    transporter.sendMail(msg, function (err, info) {
      if (err) {
        console.log(err);
        // res.send("error");
        return res.status(200).json({ error: "" });
      } else {
        console.log(info);
        // res.send("success");
        return res.status(err.statusCode || 500).json({ error: err.message });
      }
    });
  } else {
    res.status(500).json({
      status: "failure",
      message: "HCaptcha Failure",
    });
  }
  //       });
  //   } catch (err) {
  //     res.status(405).json({
  //       status: "failure",
  //       message: "Error submitting the enquiry form",
  //     });
  //   }
  // } else
  {
    res.status(405);
    res.end();
  }
}

export default sendEmail;
