// components/MapWrapper.tsx
"use client"; // Mark this as a Client Component

import dynamic from 'next/dynamic';

interface MapWrapperProps {
  accessToken: string;
}

const DynamicMap = dynamic(() => import('./map'), { ssr: false });

const MapWrapper: React.FC<MapWrapperProps> = ({ accessToken }) => {
  return <DynamicMap accessToken={accessToken} />;
};

export default MapWrapper;
