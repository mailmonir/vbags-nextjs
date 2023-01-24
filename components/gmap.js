import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GMap = ({ lat, lng }) => {
  const googlemap = useRef(null);
  useEffect(() => {
    process.env.NEXT_PUBLIC_API_KEY;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: "weekly",
    });
    let map;
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: { lat: Number(lat), lng: Number(lng) },
        zoom: 14,
      });

      const infoWindow = new google.maps.InfoWindow();

      const marker = new google.maps.Marker({
        position: { lat: Number(lat), lng: Number(lng) },
        map,
        title: "Victor Bags BD Limited",
      });

      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });
    });
  });
  return <div id="map" ref={googlemap} />;
};

export default GMap;
