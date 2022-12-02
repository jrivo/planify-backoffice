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

const getActivity = async (id) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "activities/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const activity = await response.json();
    return activity;
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
      },
      body: JSON.stringify(place),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export {
  getDestinations,
  getActivities,
  getPlaceTypes,
  saveDestination,
  getActivity,
};
