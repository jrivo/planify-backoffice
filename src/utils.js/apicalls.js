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

export { getDestinations, getActivities };
