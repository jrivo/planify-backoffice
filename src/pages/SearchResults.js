import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Button from "../components/general/Button";
import HorizontalCard from "../components/general/HorizontalCard";
import { search } from "../utils.js/apicalls";
import { getFormattedDate, shortenText } from "../utils.js/format";
const SearchResults = () => {
  // get search params from url
  const location = useLocation();
  const [destinations, setDestinations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);
  const [all, setAll] = useState([]);
  console.log("location", location);

  const loadData = async () => {
    if (location.state.object === "places" || location.state.object === "all") {
      const destinationsList = await search("places", {
        search: location.state.query,
      });

      setDestinations(
        destinationsList
          ? destinationsList?.places?.map((destination) => ({
              id: destination.id,
              title: destination.name,
              subtitle1:
                destination.address.postalCode + " " + destination.address.city,
              image:
                destination.medias !== undefined &&
                destination.medias.length > 0
                  ? destination.medias[0].url
                  : process.env.REACT_APP_IMAGE_PLACEHOLDER,
            }))
          : []
      );
    }

    if (
      location.state.object === "activities" ||
      location.state.object === "all"
    ) {
      const activitiesList = await search("activities", {
        search: location.state.query,
      });

      setActivities(
        activitiesList
          ? activitiesList?.activities?.map((activity) => ({
              subtitle1: getFormattedDate(activity.date),
              title: shortenText(activity.name, 18),
              image:
                activity.medias && activity.medias.length > 0
                  ? activity.medias[0].url
                  : process.env.REACT_APP_IMAGE_PLACEHOLDER,

              subtitle2: activity.address?.city,
              footerText: activity.price ? activity.price + " €" : "Free",
            }))
          : []
      );
    }

    setSearchComplete(true);
  };

  useEffect(() => {
    loadData();
  }, [location.state.query, location.state.object]);

  return (
    <Box
      sx={{
        padding: "20px",
        marginLeft: "30px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "50px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "28px",
            fontWeight: "300",
          }}
        >
          Search results
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          display: "flex",
          position: "relative",
          // justifyContent: "center",
        }}
      >
        {searchComplete &&
          destinations.length === 0 &&
          activities.length === 0 && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: "28px",
                  fontWeight: "300",
                  textAlign: "center",
                }}
              >
                No results found
              </Typography>
              <Button
                style={{
                  marginTop: "20px",
                  width: "100px",
                  height: "35px",
                  fontSize: "16px",
                }}
                onClick={() => {
                  window.history.back();
                }}
              >
                Go back
              </Button>
            </Box>
          )}
        <Box
          style={{
            maxWidth: "900px",
            width: "100%",
            minHeight: "574.062px",
          }}
        >
          {destinations && destinations.length > 0 && (
            <Box sx={{ marginBottom: "20px" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                Destinations
              </Typography>
            </Box>
          )}

          {destinations.map((destination) => (
            <HorizontalCard style={{ marginBottom: "30px" }} {...destination} />
          ))}

          {activities && activities.length > 0 && (
            <Box sx={{ marginBottom: "20px" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                Activities
              </Typography>
            </Box>
          )}

          {activities.map((destination) => (
            <HorizontalCard style={{ marginBottom: "30px" }} {...destination} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResults;
