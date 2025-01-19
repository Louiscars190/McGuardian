import type { NextApiRequest, NextApiResponse } from 'next';
import buildings from '@/public/coords.json';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const startBuildingName = "Trottier Building";  // TODO: example

    const startBuilding = buildings.find((building: any) => {
        return building.name === startBuildingName;
    });

    const destinationBuildingName = "Arts Building";  // TODO: example

    const destinationBuilding = buildings.find((building: any) => {
        return building.name === destinationBuildingName;
    });

    if (!startBuilding) {
        console.log("Start building not found.");
      } 
      else if (!destinationBuilding) {
        console.log("Destination building not found.");
      } else {

        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

        try{
            const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${startBuilding.longitude}%2C${startBuilding.latitude}%3B${destinationBuilding?.longitude}%2C${destinationBuilding?.latitude}?alternatives=false&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;
            const response = await fetch(url);
            const directionsData = await response.json();
            res.status(200).json(directionsData);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching directions' });
        }
      }
      res.status(300).json({ error: 'Building not found' });  // 300 for status 
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching directions' });
  }
}