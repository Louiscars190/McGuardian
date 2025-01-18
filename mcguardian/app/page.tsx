"use client"

import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  const mapContainerRef = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return; 

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';
    
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [-74.5, 40], 
      zoom: 9 
    });
  }, []); 

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex">
        <div id="map-container" ref={mapContainerRef}>
        </div>
      </main>
    </div>
  );
}
