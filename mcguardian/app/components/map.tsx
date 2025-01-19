// components/Map.tsx
"use client"; // This directive must be the very first line

import React, {useRef} from 'react';
import Map, { Marker, NavigationControl, Layer } from 'react-map-gl';
import type {FillLayer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

interface MapProps {
  accessToken: string;
}

const polygon = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [
          -73.5746982,
          45.5037872
        ],
        [
          -73.5736339,
          45.5032517
        ],
        [
          -73.5730167,
          45.5038945
        ],
        [
          -73.5725091,
          45.5044524
        ],
        [
          -73.573459,
          45.5050051
        ],
        [
          -73.572611,
          45.5062042
        ],
        [
          -73.5736147,
          45.5067117
        ],
        [
          -73.5739582,
          45.5062117
        ],
        [
          -73.5745916,
          45.5055239
        ],
        [
          -73.575672,
          45.5060667
        ],
        [
          -73.5749501,
          45.5067903
        ],
        [
          -73.575248,
          45.5069219
        ],
        [
          -73.5754895,
          45.5066738
        ],
        [
          -73.5759619,
          45.5061927
        ],
        [
          -73.5801098,
          45.5082696
        ],
        [
          -73.5795362,
          45.509408
        ],
        [
          -73.5787848,
          45.5103551
        ],
        [
          -73.5788707,
          45.5109114
        ],
        [
          -73.5800622,
          45.5111519
        ],
        [
          -73.5827885,
          45.5123813
        ],
        [
          -73.5841081,
          45.5111491
        ],
        [
          -73.5852942,
          45.5098792
        ],
        [
          -73.58421,
          45.5092488
        ],
        [
          -73.5842798,
          45.5081282
        ],
        [
          -73.583786,
          45.507305
        ],
        [
          -73.5840291,
          45.5070408
        ],
        [
          -73.5839647,
          45.5059583
        ],
        [
          -73.5834226,
          45.5054782
        ],
        [
          -73.5818515,
          45.504619
        ],
        [
          -73.5830169,
          45.5032706
        ],
        [
          -73.5839217,
          45.5021085
        ],
        [
          -73.5820163,
          45.5012745
        ],
        [
          -73.5795374,
          45.5033684
        ],
        [
          -73.5771543,
          45.5022444
        ],
        [
          -73.5769503,
          45.5024098
        ],
        [
          -73.576317,
          45.5021278
        ],
        [
          -73.5746982,
          45.5037872
        ]
      ]
    ]
  }
};

const threedLayer: FillLayer = {
  id: 'add-3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: [
    'all',
    ['==', 'extrude', 'true'],
    ['==', 'id', '19912449'],
  ],
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
    'fill-extrusion-opacity': 1.0
          }
  };

const MyMap: React.FC<MapProps> = ({ accessToken }) => {
    const mapRef = useRef<any>(null);
    const handleResize = (event: mapEvent) => {
      const { width, height } = event.viewport;
  };
  return (
    <Map
      ref={mapRef}
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
      onResize={handleResize}
    >
      <NavigationControl position="top-right" />
      <Marker longitude={-73.576920} latitude={45.506334} color="red" />
      {/* Add more Markers or Popups as needed */}
      <Layer {...threedLayer} />
    </Map>
  );
};

export default MyMap;
