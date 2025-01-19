// components/Map.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import Map, { Marker, NavigationControl, Layer, MapRef, Source } from "react-map-gl";
import type { FillExtrusionLayer } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  accessToken: string;
}

const threedLayer: FillExtrusionLayer = {
  id: "add-3d-buildings",
  type: "fill-extrusion",
  source: "composite",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  minzoom: 15,
  paint: {
    "fill-extrusion-color": "#aaa",
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      15.05,
      ["get", "height"]
    ],
    "fill-extrusion-base": [
      "interpolate",
      ["linear"],
      ["zoom"],
      20,
      0,
      20,
      ["get", "min_height"]
    ],
    "fill-extrusion-opacity": 0.9
  }
};

// Example bounding box around Montreal area: [west, south, east, north]
const MAX_BOUNDS: [number, number, number, number] = [-74.0, 45.0, -73.0, 46.0];

const MyMap: React.FC<MapProps> = ({ accessToken }) => {
  const mapRef = useRef<MapRef>(null);

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const handleCloseSidebar = () => setIsSidebarVisible(false);

  // Set max bounds when the map style loads
  useEffect(() => {
    const mapboxMap = mapRef.current?.getMap();
    if (!mapboxMap) return;

    // Listen for the style to finish loading
    mapboxMap.on("load", () => {
      // Now you can call Mapbox GL methods directly
      mapboxMap.setMaxBounds(MAX_BOUNDS); // The bounding box
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: isSidebarVisible ? "row-reverse" : "column"
      }}
    >
      {isSidebarVisible && (
        <div
          style={{
            width: "500px",
            backgroundColor: "#f4f4f4",
            padding: "20px",
            boxSizing: "border-box",
            overflowY: "auto"
          }}
        >
          <h2>Sidebar</h2>
          <button onClick={handleCloseSidebar}>Close</button>
        </div>
      )}

      <div style={{ flex: 1 }}>
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: -73.5770202148879,
            latitude: 45.50442585109525,
            bearing: 305.2,
            zoom: 15.5,
            pitch: 60
          }}
          style={{ width: "100%", height: "1000px" }}
          mapStyle="mapbox://styles/louiscars190/cm62xnnln004n01s70pke87lz"
          terrain={{ source: "mapbox-dem", exaggeration: 1.0 }}
            maxBounds={[
              [-73.58921528570465, 45.49962298404944], // Southwest corner45.49962298404944, -73.58921528570465
              [-73.56800706370899, 45.50919039135009], // Northeast corner 45.50919039135009, -73.56800706370899
            ]}
          mapboxAccessToken={accessToken}
        >
          <NavigationControl position="top-right" />
          <Marker longitude={-73.57692} latitude={45.506334} color="red" />
          <Layer {...threedLayer} />
          <Source
            id="mapbox-dem"
            type="raster-dem"
            url="mapbox://mapbox.mapbox-terrain-dem-v1"
            tileSize={512}
            maxzoom={14}
          />
        </Map>
      </div>
    </div>
  );
};

export default MyMap;
