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

export { getDestinations };
