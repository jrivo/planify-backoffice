import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ActivityCard from "../components/general/ActivityCard";
import Map from "../components/Map";
import { getDestinations, getEvents } from "../utils.js/apicalls";
import useMediaQuery from "@mui/material/useMediaQuery";
import { capitalize } from "../utils.js/format";

const Overview = () => {
  const [destinations, setDestinations] = useState([]);
  const [activities, setActivities] = useState([]);
  const isMediumScreen = useMediaQuery("(max-width:1500px)");
  const [events, setEvents] = useState([]);

  const loadData = async () => {
    const destinationData = await getDestinations({
      limit: 6,
      merchant:
        localStorage.getItem("role").toUpperCase() === "MERCHANT"
          ? localStorage.getItem("id")
          : undefined,
    });

    const eventData = await getEvents({
      merchant:
        localStorage.getItem("role").toUpperCase() === "MERCHANT"
          ? localStorage.getItem("id")
          : undefined,
    });

    setEvents(
      eventData.events.map((event) => ({
        id: event.id,
        user:
          capitalize(event?.user?.firstName) +
          " " +
          capitalize(event?.user?.lastName),
        userPicture: event?.user?.profilePicture?.url,
        action:
          event?.type === "ACTIVITY_SUBSCRIBED"
            ? "Subscribed to "
            : event?.type === "ACTIVITY_UNSUBSCRIBED"
            ? "Unsubscribed from "
            : event?.type === "REVIEW_POSTED"
            ? "Posted a review for"
            : event?.type === "REVIEW_UPDATED" && "Updated a review",
        thing: event?.activity
          ? event?.activity?.name
          : event?.place
          ? event?.place?.name
          : "",
        date: event?.createdAt,
      }))
    );
    setDestinations(
      destinationData.places.map((destination) => ({
        id: destination.id,
        position: {
          lat: parseFloat(destination.address?.latitude),
          lng: parseFloat(destination.address?.longitude),
        },
        cardData: {
          title: destination.name,
          image:
            destination.medias !== undefined && destination.medias.length > 0
              ? destination.medias[0].url
              : process.env.REACT_APP_IMAGE_PLACEHOLDER,

          subtitle1:
            destination?.address?.postalCode + " " + destination?.address?.city,
        },
      }))
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box
      sx={{
        padding: "20px",
        marginLeft: "20px",
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
          Overview
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "#2D3E50",
            marginLeft: isMediumScreen ? "12vw" : "35px",
          }}
          fontSize="20px"
          marginBottom="20px"
        >
          All destinations
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Map data={destinations} />

        {!isMediumScreen && (
          <Card
            sx={{
              maxHeight: "92%",
              width: "22vw",
              marginRight: "18px",
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
              paddingTop: "30px",
              paddingBottom: "30px",
              alignItems: "center",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                // sx={{ textAlign: "center" }}

                sx={{
                  fontSize: "22px",
                  color: "#2D3E50",
                  marginBottom: "10px",
                  marginLeft: "20px",
                }}
              >
                Recent activity{" "}
              </Typography>

              {events && events.length ? (
                events.map((event, index) => (
                  <>
                    <ActivityCard
                      person={event.user}
                      action={event.action}
                      thing={event.thing}
                      date={event.date}
                      image={event.userPicture}
                      style={{
                        marginBottom: "25px",
                        marginTop: "25px",
                        marginLeft: "30px",
                      }}
                    />
                    {index !== 4 && <Divider />}
                  </>
                ))
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "grey.500",
                  }}
                >
                  No recent activity
                </Box>
              )}

              {/* <Typography variant="h5" component="div" sx={{ color: "grey.500" }}>
              Coming soon
            </Typography> */}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default Overview;
