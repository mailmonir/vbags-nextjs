import React, { useState, useCallback } from "react";
import { useReCaptcha } from "next-recaptcha-v3";
import { Inter } from "@next/font/google";
import { useForm } from "react-hook-form";
import axios from "axios";
const inter = Inter();

const ContactForm = ({ settings }) => {
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    console.log("Sending...");

    const token = await executeRecaptcha("form_submit");

    const data = {
      formData,
      email: settings.contactFormEmailRece,
      token,
    };

    axios.post("/api/contactform", data).then((res) => {
      setLoading(false);
      console.log("Response received");
      console.log(res);
      if (res.status === 200) {
        setResponseText(
          `Your message is successfully submitted. We'll contact you shortly.`
        );
        reset();
      } else {
        setResponseText(
          "There was a problem sending mail. Please try again later."
        );
      }
    });
  };

  return (
    <div className="book__form">
      {responseText && (
        <p
          className="form__submitted"
          style={
            responseText.startsWith("Your")
              ? { color: "green" }
              : { color: "#eb2f64" }
          }
        >
          {responseText}
        </p>
      )}

      <form
        action="#"
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="u-margin-bottom-medium">
          <h2 className={`heading-tertiary ${inter.className}`}>
            Submit your inquiry
          </h2>
        </div>

        <div className="form__group">
          <span className="form__validation">{errors?.name?.message}</span>

          <input
            type="text"
            className="form__input"
            placeholder="Full name"
            id="name"
            name="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least three charecter long",
              },
            })}
          />

          <label htmlFor="name" className="form__label">
            Full name
          </label>
        </div>

        <div className="form__group">
          <span className="form__validation">{errors?.email?.message}</span>

          <input
            type="email"
            className="form__input"
            placeholder="Email address"
            id="email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Must be a valid email address",
              },
            })}
          />

          <label htmlFor="email" className="form__label">
            Email address
          </label>
        </div>

        <div className="form__group">
          <span className="form__validation">{errors?.message?.message}</span>
          <textarea
            className="form__input"
            placeholder="Message"
            id="message"
            name="message"
            rows="4"
            {...register("message", {
              required: "Should have a valid message",
              minLength: {
                value: 20,
                message: "Message must be at least 20 charecter long",
              },
            })}
          ></textarea>

          <label htmlFor="message" className="form__label">
            Message
          </label>
        </div>
        <div className="form__group"></div>

        <div className="form__group">
          <button className="btn btn--red" type="submit" disabled={loading}>
            {loading ? `Submitting...` : `Send message →`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
