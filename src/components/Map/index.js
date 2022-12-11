import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  MarkerF as Marker,
} from "@react-google-maps/api";
import Card from "../Card";
import ContentBox from "../ContentBox";
import "./style.css";
import { useNavigate } from "react-router-dom";

// style that applies to all page

const style = {
  ".gm-style-iw-d": {
    backgroundColor: "red",
  },
};

const markers = [
  {
    id: 1,
    name: "notre dame",
    position: { lat: 48.8534, lng: 2.3488 },
  },
  {
    id: 2,
    name: "eiffel tower",
    position: { lat: 48.8584, lng: 2.2945 },
  },
];

//center of paris
const center = {
  lat: 48.8566,
  lng: 2.3522,
};

function Map({ data }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const navigate = useNavigate();
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = {
      north: parseFloat(center.lat) + 0.05,
      south: parseFloat(center.lat) - 0.05,
      east: parseFloat(center.lng) + 0.05,
      west: parseFloat(center.lng) - 0.05,
    };

    map.fitBounds(bounds);
  };

  return (
    <div style={style}>
      {data ? (
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          mapContainerStyle={{ width: "50vw", height: "95%" }}
        >
          {data?.map(({ id, position, cardData }) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <ContentBox
                    {...cardData}
                    style={{
                      marginTop: "13px",
                      paddingLeft: "18px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/destinations/${id}`)}

                    // footerText="footerText"
                  />
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
}

export default Map;
