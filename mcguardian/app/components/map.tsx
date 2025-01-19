"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import Map, { Marker, NavigationControl, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import _ from "lodash";

interface MapProps {
  accessToken?: string;
}

const MAX_BOUNDS: [number, number, number, number] = [-74.0, 45.0, -73.0, 46.0];

export default function MyMap({ accessToken }: MapProps) {
  const mapboxAccessToken =
    accessToken || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const mapRef = useRef<MapRef>(null);
  const mapWrapper = useRef<HTMLDivElement>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<ReactNode>(
    <p>Click a marker to see info</p>
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mapboxMap = mapRef.current?.getMap();
    if (!mapboxMap) return;
    mapboxMap.on("load", () => {
      mapboxMap.setMaxBounds(MAX_BOUNDS);
    });
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

  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
    const mapboxMap = mapRef.current?.getMap();
    if (mapboxMap) {
      setTimeout(() => {
        mapboxMap.resize();
      }, 300);
    }
  };

  const handleMarker1Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Custom Marker</h2>
        <p>This marker doesn’t match any official resource; you can customize it!</p>
      </>
    );
  };

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

  const handleMarker14Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Schulich Library</h2>
        <p>
          <a
            href="https://www.mcgill.ca/library/branches/schulich"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/library/branches/schulich
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:514-398-4769" className="text-blue-600 underline">
            514-398-4769
          </a>
        </p>
        <p>809 Sherbrooke Street West, Montreal, Quebec H3A 0C1</p>
      </>
    );
  };

  const handleMarker15Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Redpath-McLennan Library</h2>
        <p>
          <a
            href="https://www.mcgill.ca/library/branches/hssl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/library/branches/hssl
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:514-398-4734" className="text-blue-600 underline">
            514-398-4734
          </a>
        </p>
        <p>3459 McTavish Street, Montreal, Quebec H3A 0C9</p>
      </>
    );
  };

  const handleMarker16Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Nahum Gelber Law Library</h2>
        <p>
          <a
            href="https://www.mcgill.ca/library/branches/law"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/library/branches/law
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:514-396-2346" className="text-blue-600 underline">
            514-396-2346
          </a>
        </p>
        <p>3660 Peel Street, Montreal, Quebec H3A 1W9</p>
      </>
    );
  };

  const handleMarker17Click = () => {
    setIsSidebarVisible(true);
    setSidebarContent(
      <>
        <h2 className="text-xl font-bold mb-2">Marvin Duchow Music Library</h2>
        <p>
          <a
            href="https://www.mcgill.ca/library/branches/music"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.mcgill.ca/library/branches/music
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:514-398-4695" className="text-blue-600 underline">
            514-398-4695
          </a>
        </p>
        <p>527 Sherbrooke Street West, Montreal, Quebec H3A 1E3</p>
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
      <div
        style={{
          position: "absolute",
          left: "20px",
          zIndex: 10,
          display: isSidebarVisible && isMobile ? "none" : "block",
        }}
      >
        <img
          src="mcguarian_full_logo.png"
          style={{
            width: "20vh",
            height: "20vh",
            objectFit: "contain",
          }}
        />
      </div>

      {isSidebarVisible && (
        <div className="flex flex-col w-[500px] p-6 overflow-y-auto bg-white shadow-lg ring-1 ring-gray-200 box-border">
          <div className="prose prose-lg max-w-none">{sidebarContent}</div>
          <button
            onClick={handleCloseSidebar}
            className="mt-4 w-full sm:w-auto inline-block px-5 py-2 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      )}

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
          <Marker
            longitude={90}
            latitude={1}
            color="red"
            onClick={handleMarker1Click}
          />
          <Marker
            longitude={-73.574910039976}
            latitude={45.504622946636026}
            color="red"
            onClick={handleMarker2Click}
          />
          <Marker
            longitude={-73.57868096357672}
            latitude={45.50370699117317}
            color="red"
            onClick={handleMarker3Click}
          />
          <Marker
            longitude={-73.57834090766332}
            latitude={45.503808585634005}
            color="red"
            onClick={handleMarker4Click}
          />
          <Marker
            longitude={-73.57221320293561}
            latitude={45.505722001265504}
            color="red"
            onClick={handleMarker5Click}
          />
          <Marker
            longitude={-73.57895021642786}
            latitude={45.50407030096951}
            color="red"
            onClick={handleMarker6Click}
          />
          <Marker
            longitude={-73.57812194539879}
            latitude={45.50370437965529}
            color="red"
            onClick={handleMarker7Click}
          />
          <Marker
            longitude={-73.57818623444581}
            latitude={45.50386221321164}
            color="red"
            onClick={handleMarker8Click}
          />
          <Marker
            longitude={-73.57164491702342}
            latitude={45.50735103251133}
            color="blue"
            onClick={handleMarker9Click}
          />
          <Marker
            longitude={-73.57602667595106}
            latitude={45.511299834649165}
            color="blue"
            onClick={handleMarker10Click}
          />
          <Marker
            longitude={-73.57356862806844}
            latitude={45.50542765558957}
            color="blue"
            onClick={handleMarker11Click}
          />
          <Marker
            longitude={-73.58360242808185}
            latitude={45.51078344516342}
            color="blue"
            onClick={handleMarker12Click}
          />
          <Marker
            longitude={-73.57548686310314}
            latitude={45.50522591455373}
            color="yellow"
            onClick={handleMarker14Click}
          />
          <Marker
            longitude={-73.57629194829202}
            latitude={45.5034465093453}
            color="yellow"
            onClick={handleMarker15Click}
          />
          <Marker
            longitude={-73.58061824550305}
            latitude={45.50352074521431}
            color="yellow"
            onClick={handleMarker16Click}
          />
          <Marker
            longitude={-73.57306173616313}
            latitude={45.506217756320176}
            color="yellow"
            onClick={handleMarker17Click}
          />
        </Map>
      </div>
    </div>
  );
}

