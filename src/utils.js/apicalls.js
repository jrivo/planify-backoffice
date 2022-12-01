const getDestinations = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "places", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    });
    const destinations = await response.json();
    return destinations;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getActivities = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "activities",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const activities = await response.json();
    return activities;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getPlaceTypes = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "place-types",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const placeTypes = await response.json();
    return placeTypes;
  } catch (error) {
    console.log("error: ", error);
  }
};

const saveDestination = async (place) => {
  console.log(place);
  try {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "places", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
        body: JSON.stringify({
          name: "Pink",
          placeTypeId: 2,
          email: "amine7.ziani@gmail.com",
          phone: "+33652145662",
          website: "pinkhotel.fr",
          description: "This hotel is amazing dude, you should try it out ",
          street: "Boulevard de Magenta",
          streetNumber: "56",
          city: "Paris",
          postalCode: "75010",
          region: "Île-de-France",
          country: "France",
        }),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export { getDestinations, getActivities, getPlaceTypes, saveDestination };
