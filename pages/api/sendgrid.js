import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(req, res) {
  if (req.method === "POST") {
    try {
      fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${req.body.token}`,
      })
        .then((hCaptchaRes) => hCaptchaRes.json())
        .then((hCaptchaRes) => {
          console.log(hCaptchaRes, "Response from hCaptcha  verification API");
          if (hCaptchaRes?.success === true) {
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
            sendgrid
              .send(msg)
              .then(() => {
                return res.status(200).json({ error: "" });
              })
              .catch(() => {
                return res
                  .status(error.statusCode || 500)
                  .json({ error: error.message });
              });
          } else {
            res.status(500).json({
              status: "failure",
              message: "Google ReCaptcha Failure",
            });
          }
        });
    } catch (err) {
      res.status(405).json({
        status: "failure",
        message: "Error submitting the enquiry form",
      });
    }
  } else {
    res.status(405);
    res.end();
  }
}

export default sendEmail;
