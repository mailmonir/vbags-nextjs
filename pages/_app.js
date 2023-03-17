import { Rubik } from "@next/font/google";
import "../styles/main.scss";
import { ReCaptchaProvider } from "next-recaptcha-v3";

const rubik = Rubik({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}>
      <div className={`${rubik.className}`}>
        <Component {...pageProps} />
      </div>
    </ReCaptchaProvider>
  );
}
