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

  // For 3D building highlight (if needed)
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  // Whether the sidebar is visible
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // The text displayed in the sidebar
  const [sidebarText, setSidebarText] = useState("Click a marker to see info");

  // Ensure the map is set up after load
  useEffect(() => {
    const mapboxMap = mapRef.current?.getMap();
    if (!mapboxMap) return;

    mapboxMap.on("load", () => {
      mapboxMap.setMaxBounds(MAX_BOUNDS);
    });

    // Optionally disable double-click zoom
    if (mapboxMap) {
      mapboxMap.doubleClickZoom.disable();
    }

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

  // Close the sidebar
  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
    const mapboxMap = mapRef.current?.getMap();
    if (mapboxMap) {
      // Resize map after sidebar transition finishes
      setTimeout(() => {
        mapboxMap.resize();
      }, 300);
    }
  };

  // ---------- MARKER CLICK HANDLERS ----------

  // 1) Example of an extra marker (if you have a custom location).
  //    If you don't need it, remove this marker and its handler.
  const handleMarker1Click = () => {
    setIsSidebarVisible(true);
    setSidebarText("This marker doesn’t match any official resource, but you can customize it here!");
  };

  // 2) Security Services: (45.504622946636026, -73.574910039976)
  const handleMarker2Click = () => {
    setIsSidebarVisible(true);
    setSidebarText(`
Security Services
“We offer our services on a 24-hour basis to all members of the McGill community. 
Our agents patrol the campus, manage access, transport students and staff with disabilities as well as respond to incidents and emergencies.”
https://www.mcgill.ca/campussafety/security-services
Burnside Hall, 805 Sherbrooke St. West, Room 120, Montreal, Qc H3A 0B9
Email: campus.security@mcgill.ca
General Inquiries: 514-398-4556
Emergencies: 514-398-3000
    `);
  };

  // 3) Wellness Hub: (45.50370699117317, -73.57868096357672)
  const handleMarker3Click = () => {
    setIsSidebarVisible(true);
    setSidebarText(`
Wellness Hub
“The Student Wellness Hub provides a range of services to support the well-being of McGill Students with a focus on awareness, prevention, and early intervention.”
https://www.mcgill.ca/wellness-hub/
1070 Avenue Dr. Penfield - Suite 3400, Montreal, Quebec H3A 0G2
Phone: (514) 398-6017
Fax: (514) 398-2559 (encrypted)
E-mail: hub.clinic@mcgill.ca
    `);
  };

  // 4) Shag Shop: (45.50482802373358, -73.57331477241058)
  // But your code uses: (45.503808585634005, -73.57834090766332) 
  // We’ll assume you intentionally placed the marker there. 
  // Adjust coordinates if you want the exact location from your data.
  const handleMarker4Click = () => {
    setIsSidebarVisible(true);
    setSidebarText(`
Shag Shop
“The Shag Shop is an inclusive, affordable, sex-positive, safer sex and health boutique. 
Visit the Shag Shop for sexual health information and shop a variety of condoms, lubricants, toys, alternative menstrual products, and more, all at low prices.”
https://www.mcgill.ca/wellness-hub/build-your-wellness-toolkit/shag-shop
3600 McTavish St, Montreal, Quebec H3A 0G3
Telephone (General Info): 514-398-4104
Director: 514-398-1932
Email: morsl@mcgill.ca
    `);
  };

  // 5) Office for Sexual Violence Response: (45.505722001265504, -73.57221320293561)
  const handleMarker5Click = () => {
    setIsSidebarVisible(true);
    setSidebarText(`
Office for Sexual Violence Response, Support and Education
“The Office for Sexual Violence Response, Support and Education (OSVRSE) provides confidential, non-judgmental and non-directional support to those who have been impacted by sexual or gender-based violence.”
https://www.mcgill.ca/osvrse/
550 Sherbrooke O. Suite 1010, Montreal, Quebec H3A 1E3
Phone: 514.398.3954
Email: osvrse@mcgill.ca
    `);
  };

  // 6) Office of Religious or Spiritual Life: (45.50407030096951, -73.57895021642786)
  const handleMarker6Click = () => {
    setIsSidebarVisible(true);
    setSidebarText(`
Office of Religious or Spiritual Life
“We welcome all students, of any faith or religious denomination - or those with no religious affiliation at all! 
All of our resources and activities ... are free of charge and open to all McGill students who pay student services fees.”
https://www.mcgill.ca/morsl/contact
3610 McTavish Street, Room 36-2, Montreal, QC, H3A 1Y2
Email: morsl@mcgill.ca
Phone: 514-398-4104
    `);
  };

  // 7) Legal Information Clinic: (45.50370437965529, -73.57812194539879)
  const handleMarker7Click = () => {
    setIsSidebarVisible(true);
    setSidebarText(`
Legal Information Clinic
“The LICM is committed to increasing access to justice for McGill and Montreal communities ... because justice matters for everyone.”
https://licm.ca/
Phone: 438-944-6545
Email: cs.licm@mail.mcgill.ca
3480 McTavish St, Montreal, Quebec H3A 0G3
    `);
  };

  // 8) Peer Support Centre: (45.50386221321164, -73.57818623444581)
  const handleMarker8Click = () => {
    setIsSidebarVisible(true);
    setSidebarText(`
Peer Support Centre
“The Peer Support Centre (PSC) is a student-run service of the Students' Society of McGill University (SSMU). 
We provide free, one-on-one, confidential and non-judgmental peer support and resource referral to all McGill students.”
https://psc.ssmu.ca/
Room 411, SSMU Building (University Centre)
Email: mcgill.psc@gmail.com
    `);
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
      {/* SIDEBAR */}
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
          <pre style={{ whiteSpace: "pre-wrap" }}>{sidebarText}</pre>
          {/* Using <pre> with whiteSpace: pre-wrap to preserve newlines */}
          <button
            style={{ marginTop: "10px", padding: "6px" }}
            onClick={handleCloseSidebar}
          >
            Close
          </button>
        </div>
      )}

      {/* MAP CONTAINER */}
      <div style={{ flex: 1 }}>
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: -73.5770202148879,
            latitude: 45.50442585109525,
            bearing: 305.2,
            zoom: 16.5,
            pitch: 60,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/louiscars190/cm62xnnln004n01s70pke87lz"
          terrain={{ source: "mapbox-dem", exaggeration: 1.0 }}
          maxBounds={[
            [-73.58921528570465, 45.49962298404944],
            [-73.56800706370899, 45.50919039135009],
          ]}
          mapboxAccessToken={mapboxAccessToken}
        >
          <NavigationControl position="top-right" />

          {/* 1) Extra Marker (If you have some custom location) */}
          <Marker
            longitude={-73.57762934372685}
            latitude={45.505254693653875}
            color="red"
            onClick={handleMarker1Click}
          />

          {/* 2) Security Services */}
          <Marker
            longitude={-73.574910039976}
            latitude={45.504622946636026}
            color="red"
            onClick={handleMarker2Click}
          />

          {/* 3) Wellness Hub */}
          <Marker
            longitude={-73.57868096357672}
            latitude={45.50370699117317}
            color="red"
            onClick={handleMarker3Click}
          />

          {/* 4) Shag Shop */}
          <Marker
            longitude={-73.57834090766332}
            latitude={45.503808585634005}
            color="red"
            onClick={handleMarker4Click}
          />

          {/* 5) Office for Sexual Violence */}
          <Marker
            longitude={-73.57221320293561}
            latitude={45.505722001265504}
            color="red"
            onClick={handleMarker5Click}
          />

          {/* 6) Office of Religious or Spiritual Life */}
          <Marker
            longitude={-73.57895021642786}
            latitude={45.50407030096951}
            color="red"
            onClick={handleMarker6Click}
          />

          {/* 7) Legal Information Clinic */}
          <Marker
            longitude={-73.57812194539879}
            latitude={45.50370437965529}
            color="red"
            onClick={handleMarker7Click}
          />

          {/* 8) Peer Support Centre */}
          <Marker
            longitude={-73.57818623444581}
            latitude={45.50386221321164}
            color="red"
            onClick={handleMarker8Click}
          />
        </Map>
      </div>
    </div>
  );
};

export default MyMap;
