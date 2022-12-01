const GoogleAutoComplete = async (text) => {
  const promise = new Promise((resolve, reject) => {
    if (!text) {
      return reject("Need valid text input");
    }

    if (typeof window === "undefined") {
      return reject("Need valid window object");
    }

    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        {
          input: text,
          componentRestrictions: { country: "fr" },
          // types: ["address"],
          // fields: ["address_components", "geometry"],
        },
        (value) => {
          resolve(value);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
  return promise;
};

const GetPostalCode = async (placeId) => {
  const promise = new Promise((resolve, reject) => {
    if (!placeId) reject("placeId not provided");

    try {
      new window.google.maps.places.PlacesService(
        document.createElement("div")
      ).getDetails(
        {
          placeId,
          fields: ["address_components"],
        },
        (details) => {
          resolve(details);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
  return promise;
};

export { GoogleAutoComplete, GetPostalCode };
