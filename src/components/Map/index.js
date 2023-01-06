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
    // backgroundColor: "red",
    borderRadius: "20px",
    overflow: "hidden",
  },
};

const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [
      {
        color: "#202c3e",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#2d3e50",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },

      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        weight: 4,
      },
      {
        gamma: 0.84,
      },

      {
        lightness: 16,
      },

      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },

      {
        saturation: -100,
      },

      {
        lightness: 100,
      },

      {
        gamma: 0.54,
      },

      {
        weight: 0.01,
      },

      {
        hue: "#ff0000",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        visibility: "on",
      },

      {
        weight: 0.01,
      },

      {
        hue: "#ff0000",

        saturation: -100,

        lightness: 100,

        gamma: 0.54,

        invert_lightness: true,

        visibility: "off",

        color: "#ff0000",
      },
    ],
  },
];

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
          mapContainerStyle={{ width: "50vw", height: "92%" }}
          // border radius
          options={{
            styles: mapStyles,
          }}
        >
          {data?.map(({ id, position, cardData }) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              // change marker icon
              // icon={{
              //   url: "https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png",
              //   scaledSize: new window.google.maps.Size(50, 50),
              // }}
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
