// components/Map.tsx
"use client"; // This directive must be the very first line

import React from 'react';
import Map, { Marker, NavigationControl, Layer } from 'react-map-gl';
import type {FillLayer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

interface MapProps {
  accessToken: string;
}

const threedLayer: FillLayer = {
  id: 'add-3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion',
  minzoom: 15,
  paint: {
    'fill-extrusion-color': '#aaa',
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
    ],
    'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.9
          }
  };

const MyMap: React.FC<MapProps> = ({ accessToken }) => {
  return (
    <Map
      initialViewState={{
        longitude: -73.5770202148879,
        latitude: 45.50442585109525,
        bearing: 305.2,
        zoom: 15.5,
        pitch: 60,
      }}
      style={{ width: '100%', height: '1000px' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={accessToken}
    >
      <NavigationControl position="top-right" />
      <Marker longitude={1.50442585109525} latitude={73.57702021488795} color="red" />
      {/* Add more Markers or Popups as needed */}
      <Layer {...threedLayer} />
    </Map>
  );
};

export default MyMap;
