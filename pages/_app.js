import { Rubik } from "@next/font/google";
import "../styles/main.scss";

const rubik = Rubik({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={`${rubik.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
