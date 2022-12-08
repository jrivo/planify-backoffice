import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/general/Button";
import { getDestinations } from "../utils.js/apicalls";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDestinations = async () => {
    setLoading(true);
    const destinations = await getDestinations();
    // "merchant",
    // localStorage.getItem("id")

    // remove the slice when pagination is implemented
    setDestinations(destinations.slice(0, 6));
    setLoading(false);
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  if (loading)
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={100}
      />
    );

  return (
    <Box
      sx={{
        padding: "20px",
        // paddingTop: "0px",
        marginLeft: "30px",
        // backgroundColor: "red",
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
        <Typography variant="h2" sx={{ fontSize: "28px", fontWeight: "300" }}>
          Destinations
        </Typography>

        <Button onClick={() => navigate("/destinations/create")}>
          New destination
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: destinations?.length >= 3 ? "center" : "flex-start",
          height: "100%",
          // backgroundColor: "blue",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            maxWidth: "900px",
          }}
        >
          <Grid container spacing={3}>
            {destinations.map((destination, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  minWidth: 260,
                }}
                key={destination.id}
              >
                <Card
                  onClick={() => {
                    console.log("clicked");
                    navigate("/destinations/" + destination.id);
                  }}
                  title={destination.name}
                  image={
                    destination.medias !== undefined &&
                    destination.medias.length > 0
                      ? destination.medias[0].url
                      : process.env.REACT_APP_IMAGE_PLACEHOLDER
                  }
                  subtitle1={destination.address?.city}
                  sx={{
                    margin: "6px",
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "40px",
            }}
          >
            <Stack spacing={2}>
              <Pagination count={10} />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Destinations;
