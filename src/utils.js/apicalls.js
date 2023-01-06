const getDestinations = async (params) => {
  const url =
    process.env.REACT_APP_SERVER_URL +
    "places?page=" +
    (params.page ? params.page : 1) +
    "&limit=" +
    (params.limit ? params.limit : 6) +
    (params.merchant ? "&merchant=" + params.merchant : "");

  console.log("destination url", url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    });
    const destinations = await response.json();
    console.log(destinations);
    return destinations;
  } catch (error) {
    console.log("error: ", error);
  }
};

const signup = async (body) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getDestination = async (id) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "places/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const destination = await response.json();
    console.log("this is the destination", destination);
    return destination;
  } catch (error) {
    console.log("error: ", error);
  }
};

const deleteDestination = async (id) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "places/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const destination = await response.json();
    console.log(destination);
    return destination;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getActivities = async (params) => {
  const url =
    process.env.REACT_APP_SERVER_URL +
    "activities?page=" +
    (params.page ? params.page : 1) +
    "&limit=" +
    (params.limit ? params.limit : 6) +
    (params.merchant ? "&merchant=" + params.merchant : "");

  console.log("activities url", url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    });
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

const deleteActivity = async (id) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "activities/" + id,
      {
        method: "DELETE",
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

const saveActivity = async (destinationId, data) => {
  console.log("this is the date", data);
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL +
        "places/" +
        destinationId +
        "/activities",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        body: data,
      }
    );
    const activity = await response.json();
    return activity;
  } catch (error) {
    console.log("error: ", error);
  }
};

const updateActivity = async (activityId, data) => {
  console.log("put data", data);
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "activities/" + activityId,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        body: data,
      }
    );
    const activity = await response.json();
    console.log("updated activity", activity);
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
        Authorization: "Bearer " + localStorage.token,
      },
      body: place,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const updateDestination = async (id, place) => {
  console.log(place);
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "places/" + id,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        body: place,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getCurrentUser = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.log("error: ", error);
  }
};

const updateUserInfo = async (id, data) => {
  console.log("put data", data);
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "users/" + id,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        body: data,
      }
    );
    const user = await response.json();
    if (user.error) console.log(user);
    return user;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getActivitySubscribers = async (id) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "activities/" + id + "/subscribers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const subscribers = await response.json();
    return subscribers;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getAllUsers = async (params) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL +
        "users?page=" +
        (params.page ? params.page : 1) +
        "&limit=" +
        (params.limit ? params.limit : 6),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const users = await response.json();
    return users;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getUser = async (id) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "users/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const users = await response.json();
    return users;
  } catch (error) {
    console.log("error: ", error);
  }
};

const search = async (route, params) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL +
        route +
        "?page=" +
        (params.page ? params.page : 1) +
        "&limit=" +
        (params.limit ? params.limit : 6) +
        (params.search ? "&search=" + params.search : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const activities = await response.json();
    console.log("search results", activities);
    return activities;
  } catch (error) {
    console.log("error: ", error);
  }
};

const resetPassword = async (data) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const user = await response.text();
    return user;
  } catch (error) {
    console.log("error: ", error);
  }
};

export {
  getDestinations,
  getDestination,
  deleteDestination,
  getActivities,
  saveActivity,
  updateActivity,
  deleteActivity,
  getPlaceTypes,
  saveDestination,
  updateDestination,
  getActivity,
  getActivitySubscribers,
  getCurrentUser,
  updateUserInfo,
  getAllUsers,
  getUser,
  search,
  signup,
  resetPassword,
};
