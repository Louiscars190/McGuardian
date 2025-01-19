// components/Map.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import Map, { Marker, NavigationControl, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import _ from "lodash";

interface MapProps {
  accessToken: string;
}

const MAX_BOUNDS: [number, number, number, number] = [-74.0, 45.0, -73.0, 46.0];

const MyMap: React.FC<MapProps> = ({ accessToken }) => {
  const mapRef = useRef<MapRef>(null);
  const mapWrapper = useRef<HTMLDivElement>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
    const mapboxMap = mapRef.current?.getMap();
    if (mapboxMap) {
      setTimeout(() => {
        mapboxMap.resize();
      }, 300);
    }
  };

  useEffect(() => {
    const mapboxMap = mapRef.current?.getMap();
    if (!mapboxMap) return;

    mapboxMap.on("load", () => {
      mapboxMap.setMaxBounds(MAX_BOUNDS);

      // Log available layers to console to help identify the correct layer name
      const layers = mapboxMap.getStyle().layers;
      console.log("Available layers:", layers);

      // Find the 3D building layer from the style
      const buildingLayer = layers.find(layer => 
        layer.type === 'fill-extrusion' && 
        (layer.id.includes('building') || layer.id.includes('3d'))
      );

      if (buildingLayer) {
        console.log('Found 3D building layer:', buildingLayer.id);

        // Add click event to highlight a building
        mapboxMap.on("click", buildingLayer.id, (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const featureId = feature.id as string;

            if (selectedBuilding) {
              // Reset the previously selected building
              mapboxMap.setFeatureState(
                { source: buildingLayer.source, id: selectedBuilding },
                { highlighted: false }
              );
            }

            // Set the new selected building
            setSelectedBuilding(featureId);
            
            mapboxMap.setFeatureState(
              { source: buildingLayer.source, id: featureId },
              { highlighted: true }
            );
          }
        });

        // Change cursor to pointer when hovering over buildings
        mapboxMap.on("mouseenter", buildingLayer.id, () => {
          mapboxMap.getCanvas().style.cursor = "pointer";
        });

        mapboxMap.on("mouseleave", buildingLayer.id, () => {
          mapboxMap.getCanvas().style.cursor = "";
        });

        // Add a layer with a filter to highlight the selected building
        mapboxMap.addLayer({
          id: "highlighted-building",
          type: "fill-extrusion",
          source: buildingLayer.source,
          "source-layer": buildingLayer['source-layer'],
          filter: ["==", ["id"], selectedBuilding],
          paint: {
            "fill-extrusion-color": "red",
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
              15,
              0,
              15.05,
              ["get", "min_height"]
            ],
            "fill-extrusion-opacity": 0.9
          }
        });
      } else {
        console.log('No 3D building layer found in style');
      }

      // Add the building entrance layer
      mapboxMap.addLayer({
        id: "building-entrance",
        type: "symbol",
        source: "composite",
        "source-layer": "structure",
        minzoom: 18,
        layout: {
          "icon-image": "mapbox-arrow",
          "text-field": ["get", "ref"],
          "text-size": 10,
          "text-offset": [0, -0.5],
          "text-font": ["DIN Pro Italic", "Arial Unicode MS Regular"]
        },
        filter: [
          "all",
          ["==", ["get", "class"], "entrance"],
          [
            "step",
            ["pitch"],
            true,
            50,
            ["<", ["distance-from-center"], 1],
            60,
            ["<", ["distance-from-center"], 1.5],
            70,
            ["<", ["distance-from-center"], 2]
          ]
        ],
        paint: {
          "text-color": "hsl(0, 4%, 31%)",
          "text-halo-color": "hsl(0, 9%, 69%)",
          "text-halo-width": 1,
          "icon-opacity": 0.4
        }
      });
    });

    const resizer = new ResizeObserver(_.debounce(() => {
      mapboxMap.resize();
    }, 100));
    if (mapWrapper.current) {
      resizer.observe(mapWrapper.current);
    }

    return () => {
      if (mapWrapper.current) {
        resizer.unobserve(mapWrapper.current);
      }
    };
  }, [selectedBuilding]);

  return (
    <div
      ref={mapWrapper}
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
            [-73.58921528570465, 45.49962298404944],
            [-73.56800706370899, 45.50919039135009],
          ]}
          mapboxAccessToken={accessToken}
        >
          <NavigationControl position="top-right" />
          <Marker longitude={-73.57692} latitude={45.506334} color="red" />
        </Map>
      </div>
    </div>
  );
};

export default MyMap;