import React from "react";
import MapWrapper from "./components/MapWrapper";
import { Phone } from "lucide-react";

const FloatingPhoneIcon: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
    }}
  >
    <a
      href="tel:5141234567"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          color: "blue",
          marginBottom: "8px",
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        McGill Night Helpline
      </span>
      <Phone size={48} color="blue" />
    </a>
  </div>
);

export default function Home() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

  return (
    <div>
      <MapWrapper accessToken={accessToken} />
      <FloatingPhoneIcon />
    </div>
  );
}
