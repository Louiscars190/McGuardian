import { NextResponse } from 'next/server';
import buildingData from '../../../public/coords.json';  // Fix import path

interface Building {
  building: string;
  address: string;
  latitude: number;
  longitude: number;
  }


function findBuildingByName(name: string): Building | undefined {
  console.log('Searching for building:', name);
  console.log('Available buildings:', buildingData);
  
  const building = buildingData.find((building: Building) => 
    building.building.toLowerCase() === name.toLowerCase()
  );
  
  console.log('Found building:', building);
  return building;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);
    
    const { startBuilding, destinationBuilding } = body;

    if (!startBuilding || !destinationBuilding) {
      return NextResponse.json(
        { error: 'Start and destination buildings are required' },
        { status: 400 }
      );
    }

    const startBuildingData = findBuildingByName(startBuilding);
    const destBuildingData = findBuildingByName(destinationBuilding);

    if (!startBuildingData || !destBuildingData) {
      return NextResponse.json(
        { error: 'Building not found', 
          startBuilding: startBuildingData, 
          destBuilding: destBuildingData 
        },
        { status: 404 }
      );
    }

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  console.log(startBuildingData.address);

  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${startBuildingData.longitude}%2C${startBuildingData.latitude}%3B${destBuildingData.longitude}%2C${destBuildingData.latitude}?alternatives=false&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;
    
    const response = await fetch(url);
    const directionsData = await response.json();
    
    return NextResponse.json(directionsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch directions' },
      { status: 500 }
    );
  }
} catch (error) {
  return NextResponse.json(
    { error: 'Invalid request body' },
    { status: 400 }
  );
}
}