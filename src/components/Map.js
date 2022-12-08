import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  MarkerF as Marker,
} from "@react-google-maps/api";

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

function Map({ style }) {
  const [activeMarker, setActiveMarker] = useState(null);

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
    <div
      sx={{
        ...style,
      }}
    >
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "50vw", height: "95%" }}
      >
        {markers.map(({ id, name, position }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <div>{name}</div>
                  <div
                    style={{
                      color: `#f00`,
                      backgroundColor: `blue`,
                    }}
                  >
                    these are details about this place
                  </div>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}

export default Map;
