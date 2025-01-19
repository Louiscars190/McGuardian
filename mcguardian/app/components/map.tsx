// components/Map.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import Map, { Marker, NavigationControl, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import _ from "lodash";

interface MapProps {
  accessToken?: string; // from env or passed down
}

const MAX_BOUNDS: [number, number, number, number] = [-74.0, 45.0, -73.0, 46.0];

const MyMap: React.FC<MapProps> = ({ accessToken }) => {
  const mapboxAccessToken =
    accessToken || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const mapRef = useRef<MapRef>(null);
  const mapWrapper = useRef<HTMLDivElement>(null);

  // State for 3D building highlight
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  // Toggle sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // State to track if the marker was clicked
  const [markerClicked, setMarkerClicked] = useState(false);

  // NEW: State for the random text displayed in the sidebar
  const [sidebarText, setSidebarText] = useState("Click the marker for text!");

  // We'll define some random strings to choose from
  const randomStrings = [
    "Hello McGill!",
    "Coffee at Redpath?",
    "The marker was clicked!",
    "Random Fact #42",
    "Go Martlets!",
    "Welcome to McGill campus",
    "Construction is everywhere!",
  ];

  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
    const mapboxMap = mapRef.current?.getMap();
    if (mapboxMap) {
      setTimeout(() => {
        mapboxMap.resize();
      }, 300);
    }
  };

  // Once the map is loaded, set up 3D building logic, etc. (truncated for brevity)
  useEffect(() => {
    const mapboxMap = mapRef.current?.getMap();
    if (!mapboxMap) return;

    mapboxMap.on("load", () => {
      mapboxMap.setMaxBounds(MAX_BOUNDS);
      // Additional logic for buildings or custom layers...
    });

    const resizer = new ResizeObserver(
      _.debounce(() => {
        mapboxMap.resize();
      }, 100)
    );
    if (mapWrapper.current) {
      resizer.observe(mapWrapper.current);
    }

    return () => {
      if (mapWrapper.current) {
        resizer.unobserve(mapWrapper.current);
      }
    };
  }, [selectedBuilding]);

  // When marker is clicked, toggle marker color and set random text
  const handleMarkerClick = () => {
    setMarkerClicked(!markerClicked);

    // Pick a random string from the array
    const randomIndex = Math.floor(Math.random() * randomStrings.length);
    setSidebarText(randomStrings[randomIndex]);
  };

  return (
    <div
      ref={mapWrapper}
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: isSidebarVisible ? "row-reverse" : "column",
      }}
    >
      {/* Sidebar */}
      {isSidebarVisible && (
        <div
          style={{
            width: "500px",
            backgroundColor: "#f4f4f4",
            padding: "20px",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <h2>Sidebar</h2>
          <p>Marker clicked? {markerClicked ? "YES" : "NO"}</p>
          <p>{sidebarText}</p>
          <button onClick={handleCloseSidebar}>Close</button>
        </div>
      )}

      {/* Map Container */}
      <div style={{ flex: 1 }}>
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: -73.5770202148879,
            latitude: 45.50442585109525,
            bearing: 305.2,
            zoom: 15.5,
            pitch: 60,
          }}
          style={{ width: "100%", height: "1000px" }}
          mapStyle="mapbox://styles/louiscars190/cm62xnnln004n01s70pke87lz"
          terrain={{ source: "mapbox-dem", exaggeration: 1.0 }}
          maxBounds={[
            [-73.58921528570465, 45.49962298404944],
            [-73.56800706370899, 45.50919039135009],
          ]}
          mapboxAccessToken={mapboxAccessToken}
        >
          <NavigationControl position="top-right" />

          {/* CUSTOM Marker with clickable child */}
          <Marker longitude={-73.5776375172678} latitude={45.505287821346} color="red" onClick={handleMarkerClick}/>
        </Map>
      </div>
    </div>
  );
};

export default MyMap;
