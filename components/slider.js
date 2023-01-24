import Link from "next/link";
import Image from "next/image";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function BgSlider({ slides }) {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {slides &&
        slides.map((slide, index) => (
          <div className="keen-slider__slide" key={index}>
            <Image
              src={slide?.slideImage?.sourceUrl}
              alt={slide?.slideImage?.altText}
              className="slider-image"
              width={1920}
              height={1080}
            />
            <div className="overlay">
              <div className="overlay__text-box">
                <h1 className="heading-primary">
                  <span className="heading-primary--main">
                    {slide?.mainHeading}
                  </span>
                  <span className="heading-primary--sub">
                    {slide?.subHeading}
                  </span>
                </h1>
                {slide.buttonText && (
                  <Link
                    href={slide?.buttonLink}
                    className="btn btn--white btn--animated"
                  >
                    {slide?.buttonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
