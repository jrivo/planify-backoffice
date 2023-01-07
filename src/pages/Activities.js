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
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = location.search.split("=")[1] || 1;
  console.log("current page", currentPage);

  const loadActivitivities = async () => {
    setLoading(true);
    const activities = await getActivities({
      limit: 6,
      page: currentPage && currentPage,
      merchant:
        localStorage.getItem("role").toUpperCase() === "MERCHANT"
          ? localStorage.getItem("id")
          : undefined,
    });
    setActivities(activities.activities);
    setTotalPages(activities.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    loadActivitivities();
  }, [location]);

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

      {activities?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          You have no activities.{" "}
        </Box>
      ) : (
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
              width: "100%",
              minHeight: "574.062px",
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
                <Pagination
                  count={totalPages}
                  onChange={(e, page) => {
                    navigate("/activities?page=" + page);
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default Activities;
