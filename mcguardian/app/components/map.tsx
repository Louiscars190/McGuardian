// components/Map.tsx
"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
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

  // If you have 3D building highlights, keep your 'selectedBuilding' state:
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  // Whether the sidebar is visible
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  /**
   * Instead of storing a string in sidebarText,
   * we'll store a ReactNode to allow bold text, links, etc.
   */
  const [sidebarContent, setSidebarContent] = useState<ReactNode>(
    <p>Click a marker to see info</p>
  );

  // Setup map constraints
  useEffect(() => {
    const mapboxMap = mapRef.current?.getMap();
    if (!mapboxMap) return;

    mapboxMap.on("load", () => {
      mapboxMap.setMaxBounds(MAX_BOUNDS);
    });

    // Example: disable double-click zoom
    if (mapboxMap) {
      mapboxMap.doubleClickZoom.disable();
    }

    // Resize observer for the map container
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

  // Close sidebar
  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
    const mapboxMap = mapRef.current?.getMap();
    if (mapboxMap) {
      setTimeout(() => {
        mapboxMap.resize();
      }, 300);
    }
  };

  // ------------------------
  // MARKER CLICK HANDLERS
  // ------------------------

  // 1) Example extra marker
  const handleMarker1Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Custom Marker</h2>
        <p>This marker doesn’t match any official resource; you can customize it!</p>
      </>
    );
  };

  // 2) Security Services
  const handleMarker2Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Security Services</h2>
        <p>
          “We offer our services on a 24-hour basis to all members of the McGill
          community. Our agents patrol the campus, manage access, transport students and staff with 
          disabilities as well as respond to incidents and emergencies.”
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/campussafety/security-services"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/campussafety/security-services
          </a>
        </p>
        <p>Burnside Hall, 805 Sherbrooke St. West, Room 120, Montreal, Qc H3A 0B9</p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:campus.security@mcgill.ca"
            className="text-blue-600 underline"
          >
            campus.security@mcgill.ca
          </a>
        </p>
        <p>
          <strong>General Inquiries:</strong>{" "}
          <a href="tel:5143984556" className="text-blue-600 underline">
            514-398-4556
          </a>
        </p>
        <p>
          <strong>Emergencies:</strong>{" "}
          <a href="tel:5143983000" className="text-blue-600 underline">
            514-398-3000
          </a>
        </p>
      </>
    );
  };

  // 3) Wellness Hub
  const handleMarker3Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Wellness Hub</h2>
        <p>
          “The Student Wellness Hub provides a range of services to support the
          well-being of McGill Students with a focus on awareness, prevention, and
          early intervention.”
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/wellness-hub/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/wellness-hub/
          </a>
        </p>
        <p>1070 Avenue Dr. Penfield - Suite 3400, Montreal, Quebec H3A 0G2</p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:15143986017" className="text-blue-600 underline">
            (514) 398-6017
          </a>
        </p>
        <p>Fax: (514) 398-2559 (encrypted)</p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:hub.clinic@mcgill.ca"
            className="text-blue-600 underline"
          >
            hub.clinic@mcgill.ca
          </a>
        </p>
      </>
    );
  };

  // 4) Shag Shop
  const handleMarker4Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Shag Shop</h2>
        <p>
          “The Shag Shop is an inclusive, affordable, sex-positive, safer sex and
          health boutique. Visit the Shag Shop for sexual health information and shop
          a variety of condoms, lubricants, toys, alternative menstrual products, and
          more, all at low prices.”
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/wellness-hub/build-your-wellness-toolkit/shag-shop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/wellness-hub/build-your-wellness-toolkit/shag-shop
          </a>
        </p>
        <p>3600 McTavish St, Montreal, Quebec H3A 0G3</p>
        <p>
          <strong>Telephone (General Information):</strong>{" "}
          <a href="tel:5143984104" className="text-blue-600 underline">
            514-398-4104
          </a>
        </p>
        <p>
          <strong>Telephone (Director):</strong>{" "}
          <a href="tel:5143981932" className="text-blue-600 underline">
            514-398-1932
          </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:morsl@mcgill.ca" className="text-blue-600 underline">
            morsl@mcgill.ca
          </a>
        </p>
      </>
    );
  };

  // 5) Office for Sexual Violence
  const handleMarker5Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">
          Office for Sexual Violence Response, Support and Education
        </h2>
        <p>
          “The Office for Sexual Violence Response, Support and Education (OSVRSE)
          provides confidential, non-judgmental and non-directional support to those
          who have been impacted by sexual or gender-based violence.”
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/osvrse/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/osvrse/
          </a>
        </p>
        <p>550 Sherbrooke O. Suite 1010, Montreal, Quebec H3A 1E3</p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:5143983954" className="text-blue-600 underline">
            514.398.3954
          </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:osvrse@mcgill.ca" className="text-blue-600 underline">
            osvrse@mcgill.ca
          </a>
        </p>
      </>
    );
  };

  // 6) Office of Religious or Spiritual Life
  const handleMarker6Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">
          Office of Religious or Spiritual Life
        </h2>
        <p>
          “We welcome all students, of any faith or religious denomination - or those
          with no religious affiliation at all! All of our resources and activities,
          including our workshops, events, publications, lounge and meditation space
          are free of charge and open to all McGill students who pay student services
          fees.”
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/morsl/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/morsl/contact
          </a>
        </p>
        <p>3610 McTavish Street, Room 36-2, Montreal, QC, H3A 1Y2</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:morsl@mcgill.ca" className="text-blue-600 underline">
            morsl@mcgill.ca
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:5143984104" className="text-blue-600 underline">
            514-398-4104
          </a>
        </p>
      </>
    );
  };

  // 7) Legal Information Clinic
  const handleMarker7Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Legal Information Clinic</h2>
        <p>
          “The LICM is committed to increasing access to justice for McGill and
          Montreal communities and to meeting the needs of students and marginalized
          groups because justice matters for everyone.”
        </p>
        <p>
          <a
            href="https://licm.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://licm.ca/
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:4389446545" className="text-blue-600 underline">
            438-944-6545
          </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:cs.licm@mail.mcgill.ca" className="text-blue-600 underline">
            cs.licm@mail.mcgill.ca
          </a>
        </p>
        <p>3480 McTavish St, Montreal, Quebec H3A 0G3</p>
      </>
    );
  };

  // 8) Peer Support Centre
  const handleMarker8Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Peer Support Centre</h2>
        <p>
          “The Peer Support Centre (PSC) is a student-run service of the Students'
          Society of McGill University (SSMU). We provide free, one-on-one,
          confidential and non-judgmental peer support and resource referral to all
          McGill students.”
        </p>
        <p>
          <a
            href="https://psc.ssmu.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://psc.ssmu.ca/
          </a>
        </p>
        <p>Room 411, SSMU Building (University Centre)</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:mcgill.psc@gmail.com" className="text-blue-600 underline">
            mcgill.psc@gmail.com
          </a>
        </p>
      </>
    );
  };

  // 9) Campus 1
  const handleMarker9Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Campus1 MTL</h2>
        <p>
          “All student rooms are fully furnished and include private bathrooms, air conditioning, 
          and a flatscreen TV. In addition to the shared kitchen, students in La Citadelle enjoy a 
          large common area on the first floor and a quiet study room, both surrounded by windows. 
          Situated in the center of the downtown area, La Citadelle is a recently renovated hotel 
          style residence building located two blocks east of McGill campus.”
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/students/housing/residence-options/downtown-undergrad/citadelle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/students/housing/residence-options/downtown-undergrad/citadelle
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:5143988650" className="text-blue-600 underline">
            514-398-8650
          </a>
        </p>
        <p>410 Sherbrooke St W, Montreal, Quebec H3A 1B3</p>
      </>
    );
  };

  // 10) New Residence Hall
  const handleMarker10Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">New Residence Hall</h2>
        <p>
        Built in 1976, this former hotel houses over 600 students on 12 floors and is 
        attached to the LaCite underground shopping centre.”
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/students/housing/residence-options/downtown-undergrad/newresidence"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/students/housing/residence-options/downtown-undergrad/newresidence
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:5143983471" className="text-blue-600 underline">
            514-398-3471
          </a>
        </p>
        <p>3625 Park Ave, Montreal, Quebec H2X 3P8</p>
      </>
    );
  };

  // 11) RVC
  const handleMarker11Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Royal Victoria College</h2>
        <p>
        Traditional dorm-style residence at its best! Living at RVC brings you close to practically 
        everything you need. Not only are you minutes away from downtown Montreal, you are also 
        immediately across the street from main campus.
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/students/housing/residence-options/downtown-undergrad/rvc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/students/housing/residence-options/downtown-undergrad/rvc
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:5143986378" className="text-blue-600 underline">
            514-398-6378
          </a>
        </p>
        <p>3425 Rue University, Montréal, QC H3A 2A8</p>
      </>
    );
  };

  // 12) Upper Residence
  const handleMarker12Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Upper Residence</h2>
        <p>
        Beautiful Mount Royal Park provides the backdrop for these residence halls, located just north of McGill's main campus.
         Constructed in 1962, McConnell, Molson and Gardner Halls join Douglas Hall to bring together over 800 students in one 
         neighborhood. This ideal location, referred to as “Upper Residence,” leaves the commotion of urban Montreal behind, 
         providing privacy and a genuine feeling of community amongst residents.
        </p>
        <p>
          <a
            href="https://www.mcgill.ca/students/housing/residence-options/downtown-undergrad/bmh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/students/housing/residence-options/downtown-undergrad/bmh
          </a>
        </p>
        <p>3935 Rue University, Montreal, Quebec H2W 1S8</p>
      </>
    );
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
        <div className="flex flex-col w-[500px] p-6 overflow-y-auto bg-white shadow-lg ring-1 ring-gray-200 box-border">
        <div className="prose prose-lg max-w-none">
          {sidebarContent}
        </div>
      
        <button
          onClick={handleCloseSidebar}
          className="mt-4 w-full sm:w-auto inline-block px-5 py-2 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
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

          {/* 1) Extra marker */}
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

          {/* 9) Campus 1 */}
          <Marker
            longitude={-73.57164491702342}
            latitude={45.50735103251133}
            color="blue"
            onClick={handleMarker9Click}
          />

          {/* 10) New Residence Hall */}
          <Marker
            longitude={-73.57602667595106}
            latitude={45.511299834649165}
            color="blue"
            onClick={handleMarker10Click}
          />
          
          {/* 11) Royal Victoria College Residences */}
          <Marker
            longitude={-73.57356862806844}
            latitude={45.50542765558957}
            color="blue"
            onClick={handleMarker11Click}
          />

          {/* 12) Upper Residence */}
          <Marker
            longitude={-73.58360242808185}
            latitude={45.51078344516342}
            color="blue"
            onClick={handleMarker12Click}
          />
        </Map>
      </div>
    </div>
  );
};

export default MyMap;
