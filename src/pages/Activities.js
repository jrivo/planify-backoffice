import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityCard from "../components/Card";
import Button from "../components/general/Button";
import { getActivities } from "../utils.js/apicalls";
import { useLocation } from "react-router-dom";
import { getFormattedDate, shortenText } from "../utils.js/format";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Activities = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadActivitivities = async () => {
    setLoading(true);
    const activities = await getActivities();
    console.log(activities);
    setActivities(activities.slice(0, 6));
    setLoading(false);
  };

  useEffect(() => {
    loadActivitivities();
  }, [location.state]);

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
          Activities
        </Typography>

        <Button onClick={() => navigate("/activities/create")}>
          New activity
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: activities?.length >= 3 ? "center" : "flex-start",
          height: "100%",
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
            {activities.map((activity, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  minWidth: 260,
                }}
                key={activity.id}
              >
                <ActivityCard
                  onClick={() => {
                    console.log("clicked");
                    navigate("/activities/" + activity.id);
                  }}
                  subtitle1={getFormattedDate(activity.date)}
                  title={shortenText(activity.name, 18)}
                  image={
                    activity.medias && activity.medias.length > 0
                      ? activity.medias[0].url
                      : process.env.REACT_APP_IMAGE_PLACEHOLDER
                  }
                  subtitle2={activity.address?.city}
                  footerText={activity.price ? activity.price + " €" : "Free"}
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
export default Activities;
