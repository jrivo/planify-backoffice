import { Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
const Destinations = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: "20px",
        marginLeft: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          maxWidth: "900px",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}
        >
          Destinations
        </Typography>
        <Grid container spacing={3}>
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  onClick={() => {
                    console.log("clicked");
                    navigate("/destinations/" + index);
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default Destinations;
