'use client';
import React from 'react';
import { useState } from 'react';
import MapWrapper from './components/MapWrapper';

async function getRoute(startBuilding:string, endBuilding:string) {
  const response = await fetch('/api/routeFinder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startBuildingName: startBuilding, 
      destinationBuildingName: endBuilding,    
    }),
  });

  if (!response.ok) {
    console.log(response.status);
    throw new Error('Failed to fetch route');
  }

  const data = await response.json();
  return data;
}

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
  const [startBuilding, setStartBuilding] = useState('');
  const [endBuilding, setEndBuilding] = useState('');
  const [routeData, setRouteData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await getRoute(startBuilding, endBuilding);
      console.log(data);
      setRouteData(data);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Route Finder Test</h1>
      
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label htmlFor="start" className="block">Start Building:</label>
          <input
            id="start"
            type="text"
            value={startBuilding}
            onChange={(e) => setStartBuilding(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        
        <div>
          <label htmlFor="end" className="block">End Building:</label>
          <input
            id="end"
            type="text"
            value={endBuilding}
            onChange={(e) => setEndBuilding(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Find Route
        </button>
      </form>

      {routeData && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(routeData, null, 2)}
        </pre>
      )}

      <MapWrapper accessToken={accessToken} />
      <Logo />
    </div>
  );
}