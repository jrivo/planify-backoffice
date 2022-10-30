import { Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";

// list of activities

const activities = [
  {
    id: 1,
    title: "Hiking",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "Sun, Nov 13, 2:30 PM",
    address: "10 rue de la paix, 75000 Paris",
    price: "Free",
  },
  {
    id: 2,
    title: "Cycling",
    image: "https://live.staticflickr.com/4428/36539647014_e6b811acc7_b.jpg",
    date: "Mon Nov 14, 4:00 PM",
    address: "25 rue des champs, 75000 Paris",
    price: "Free",
  },
  {
    id: 3,
    title: "Sightseeing",
    image: "https://live.staticflickr.com/65535/49826766686_879ce1be60_b.jpg",
    date: "Tue Nov 15, 6:00 PM",
    address: "12 rue d'Amsterdam, 75000 Paris",
    price: "15 €",
  },
  {
    id: 4,
    title: "Meuseum Tour",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Museum_of_Natural_History%2C_Paris_August_2013_005.jpg",
    date: "Fri Nov 18, 2:00 PM",
    address: "13 rue de grenelle, 75000 Paris",
    price: "20 €",
  },
];

const Activities = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: "20px",
        marginLeft: "30px",
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}
      >
        Activities
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: activities?.length >= 3 ? "center" : "flex-start",
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
              >
                <ActivityCard
                  onClick={() => {
                    console.log("clicked");
                    navigate("/Activities/" + index);
                  }}
                  date={activity.date}
                  title={activity.title}
                  image={activity.image}
                  address={activity.address}
                  price={activity.price}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default Activities;
