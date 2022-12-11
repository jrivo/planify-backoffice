import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import { getDestinations } from "../utils.js/apicalls";

const Overview = () => {
  const [destinations, setDestinations] = useState([]);

  const loadData = async () => {
    const data = await getDestinations();
    setDestinations(
      data.map((destination) => ({
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
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <Map data={destinations} />

        <Card
          sx={{
            height: "95%",
            width: "21vw",
            marginRight: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: "grey.500" }}>
              Comming soon
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Overview;
