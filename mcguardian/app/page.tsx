// app/page.tsx
import React from 'react';
import MapWrapper from './components/MapWrapper';

const Logo: React.FC = () => (
  <div 
    style={{
      position: "absolute",
      top: "20px",
      left: "20px",
      zIndex: 10,
    }}
    >
      <img 
        src="/logo.png"
        style={{
          width: "50px",
          height: "50px",
          objectFit: "contain",
        }}
        />
    </div>
);

export default function Home() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';

  return (
    <div>
      <MapWrapper accessToken={accessToken} />
      <Logo />
    </div>
  );
}
