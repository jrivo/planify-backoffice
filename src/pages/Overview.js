import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ActivityCard from "../components/general/ActivityCard";
import Map from "../components/Map";
import { getDestinations } from "../utils.js/apicalls";
import useMediaQuery from "@mui/material/useMediaQuery";

const Overview = () => {
  const [destinations, setDestinations] = useState([]);
  const isMediumScreen = useMediaQuery("(max-width:1600px)");

  const loadData = async () => {
    const data = await getDestinations({
      limit: 6,
      merchant:
        localStorage.getItem("role").toUpperCase() === "MERCHANT"
          ? localStorage.getItem("id")
          : undefined,
    });
    setDestinations(
      data.places.map((destination) => ({
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
          Overview
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
              maxHeight: "95%",
              width: "21vw",
              marginRight: "18px",
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
              paddingTop: "30px",
              paddingBottom: "30px",
              // justifyContent: "center",
              alignItems: "center",
              // overflowY: "scroll",
              // don't show scroll bar if not needed
              // "&::-webkit-scrollbar": {
              //   display: "none",
              // },
              // "-ms-overflow-style": "none",
              // scrollbarWidth: "none",
            }}
          >
            <CardContent>
              {
                // map over a list of 10 elements

                [...Array(5)].map((_, index) => (
                  <>
                    <ActivityCard
                      person="John Doe"
                      action="Subscribed to you event"
                      date="2021-07-30T19:00:00.000Z"
                      image="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                      style={{ marginBottom: "25px", marginTop: "25px" }}
                    />
                    {index !== 4 && <Divider />}
                  </>
                ))
              }

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
