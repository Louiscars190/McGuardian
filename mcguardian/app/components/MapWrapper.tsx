// components/MapWrapper.tsx
"use client"; // Mark this as a Client Component

import dynamic from 'next/dynamic';

interface MapWrapperProps {
  accessToken: string;
}

const DynamicMap = dynamic(() => import('./map'), { ssr: false });

const MapWrapper: React.FC<MapWrapperProps> = ({ accessToken }) => {
  return(
    <div style={{ position: 'relative', width: '100%', height: '100%'}}>
    <DynamicMap accessToken={accessToken} />
    <div 
    style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 10,
      padding: '5px',
      borderRadius: '50%',
    }}
    >
      <img 
        src="/logo.png"
        alt="Logo"
        style={{width: '500px', height: '100px', objectFit: 'contain' }}
        />
        </div>
        </div>
  ) 
};

export default MapWrapper;
