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

// import React, { useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import HCaptcha from "@hcaptcha/react-hcaptcha";
// import { Inter } from "@next/font/google";
// import axios from "axios";
// const inter = Inter();

// const ContactForm = ({ settings }) => {
//   const [responseText, setResponseText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [token, setToken] = useState(null);
//   const [captchaSolved, setCaptchaSolved] = useState(true);
//   const captchaRef = useRef(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onLoad = () => {
//     captchaRef.current.execute();
//   };

//   const onSubmit = async (formData) => {
//     setLoading(true);
//     console.log("Sending...");

//     if (!token) {
//       setCaptchaSolved(false);
//       setLoading(false);
//       return;
//     } else {
//       setCaptchaSolved(true);
//     }

//     const data = {
//       formData,
//       email: settings.contactFormEmailRece,
//       token,
//     };

//     axios.post("/api/contactform", data).then((res) => {
//       setLoading(false);
//       console.log("Response received");
//       console.log(res);
//       if (res.status === 200) {
//         setResponseText(
//           `Your message is successfully submitted. We'll contact you shortly.`
//         );
//         reset();
//         captchaRef.current.resetCaptcha();
//       } else {
//         setResponseText(
//           "There was a problem sending mail. Please try again later."
//         );
//       }
//     });

//     // fetch("/api/contactform", {
//     //   method: "POST",
//     //   headers: {
//     //     Accept: "application/json, text/plain, */*",
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(data),
//     // }).then((res) => {
//     //   setLoading(false);
//     //   console.log("Response received");
//     //   console.log(res);
//     //   if (res.status === 200) {
//     //     setResponseText(
//     //       `Your message is successfully submitted. We'll contact you shortly.`
//     //     );
//     //     reset();
//     //     // captchaRef.current.resetCaptcha();
//     //   } else {
//     //     setResponseText(
//     //       "There was a problem sending mail. Please try again later."
//     //     );
//     //   }
//     // });
//   };

//   return (
//     <div className="book__form">
//       {responseText && (
//         <p
//           className="form__submitted"
//           style={
//             responseText.startsWith("Your")
//               ? { color: "green" }
//               : { color: "#eb2f64" }
//           }
//         >
//           {responseText}
//         </p>
//       )}

//       <form
//         action="#"
//         className="form"
//         autoComplete="off"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="u-margin-bottom-medium">
//           <h2 className={`heading-tertiary ${inter.className}`}>
//             Submit your inquiry
//           </h2>
//         </div>

//         <div className="form__group">
//           <span className="form__validation">{errors?.name?.message}</span>

//           <input
//             type="text"
//             className="form__input"
//             placeholder="Full name"
//             id="name"
//             name="name"
//             {...register("name", {
//               required: "Name is required",
//               minLength: {
//                 value: 3,
//                 message: "Name must be at least three charecter long",
//               },
//             })}
//           />

//           <label htmlFor="name" className="form__label">
//             Full name
//           </label>
//         </div>

//         <div className="form__group">
//           <span className="form__validation">{errors?.email?.message}</span>

//           <input
//             type="email"
//             className="form__input"
//             placeholder="Email address"
//             id="email"
//             name="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//                 message: "Must be a valid email address",
//               },
//             })}
//           />

//           <label htmlFor="email" className="form__label">
//             Email address
//           </label>
//         </div>

//         <div className="form__group">
//           <span className="form__validation">{errors?.message?.message}</span>
//           <textarea
//             className="form__input"
//             placeholder="Message"
//             id="message"
//             name="message"
//             rows="4"
//             {...register("message", {
//               required: "Should have a valid message",
//               minLength: {
//                 value: 20,
//                 message: "Message must be at least 20 charecter long",
//               },
//             })}
//           ></textarea>

//           <label htmlFor="message" className="form__label">
//             Message
//           </label>
//         </div>
//         <div className="form__group">
//           {!captchaSolved && (
//             <span className="form__validation">
//               Please verify that you are a human
//             </span>
//           )}

//           <HCaptcha
//             sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
//             onVerify={setToken}
//             ref={captchaRef}
//           />
//         </div>

//         <div className="form__group">
//           <button className="btn btn--red" type="submit" disabled={loading}>
//             {loading ? `Submitting...` : `Send message →`}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
