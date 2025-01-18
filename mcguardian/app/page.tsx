// app/page.tsx
import React from 'react';
import MapWrapper from './components/MapWrapper';

export default function Home() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';

  return (
    <div>
      <h1>My Mapbox Map</h1>
      <MapWrapper accessToken={accessToken} />
    </div>
  );
}
