// components/Map.tsx
"use client"; // This directive must be the very first line

import React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

interface MapProps {
  accessToken: string;
}

const MyMap: React.FC<MapProps> = ({ accessToken }) => {
  return (
    <Map
      initialViewState={{
        longitude: -73.5770202148879,
        latitude: 45.50442585109525,
        zoom: 10.5,
      }}
      style={{ width: '100%', height: '1000px' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={accessToken}
    >
      <NavigationControl position="top-right" />
      <Marker longitude={1.50442585109525} latitude={73.57702021488795} color="red" />
      {/* Add more Markers or Popups as needed */}
    </Map>
  );
};

export default MyMap;
