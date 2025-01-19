// components/Map.tsx
"use client"; // Must be the first line in a Next.js Server Component with Client rendering

import React, { useRef, useState, useEffect } from "react";
import Map, { Marker, NavigationControl, Layer, MapRef, Source } from "react-map-gl";
// For a 3D extrusion layer, import FillExtrusionLayer (not just FillLayer)
import type { FillExtrusionLayer } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


interface MapProps {
  accessToken: string;
}

// Define the 3D building layer
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

const MyMap: React.FC<MapProps> = ({ accessToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
    
    
    setTimeout(() => {
      if(mapRef.current){
        mapRef.current.resize();
      }
    }, 100);
  };
  
  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
  }
  const handleStyleLoad = (map) => {
    mapRef.current = map;
  };

  useEffect(()=>{
    //map init....
    const resizer = new ResizeObserver(_.debounce(() => map.resize(), 100));
    resizer.observe(mapWrapper.current); 

      return () => {
      resizer.disconnect();
      map.remove();
    };
},[])

  return (
  <div style={{display: "flex", height: "100vh", flexDirection: isSidebarVisible ? "row-reverse" : "column",
    }}
    >
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
          <h2>Siderbar</h2>
          <p>
          </p>
          <button onClick={handleCloseSidebar}>Close</button>
      </div>
      )}
  <div style={{ flex: 1}}>
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
      onStyleLoad={handleStyleLoad}
      terrain={{source: 'mapbox-dem', exaggeration: 1.0}}
      mapboxAccessToken={accessToken}
    >
      <NavigationControl position="top-right" />
      <Marker longitude={-73.57692} latitude={45.506334} color="red" />
      {/* Add more Markers or Popups as needed */}
      <Layer {...threedLayer} />

      {/* DEM (terrain) source: Convert numeric props from string to {number} */}
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
