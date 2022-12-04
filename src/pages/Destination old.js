import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useState, useEffect } from "react";

const Destination = ({ destination, onClick }) => {
  const params = useParams();
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat eget ipsum et porta. Ut lobortis rhoncus ultrices. Nunc nulla risus, lacinia pretium auctor at, maximus vitae lorem. Maecenas nunc enim, imperdiet sit amet erat in, euismod luctus orci. Cras sodales tempor nunc. Aenean vitae viverra risus. Vivamus tempor congue vestibulum  Donec non varius tortor, id lobortis enim. Aenean sed urna quis nibh iaculis fringilla vel sit amet massa. Cras mollis eros lectus, vel dictum arcu dapibus in. Sed a nulla et augue feugiat luctus at vel nunc. Nulla nec nulla ultricies, porta orci ac, facilisis risus. Suspendisse sit amet dui euismod, egestas odio ut, venenatis libero. Fusce elementum laoreet justo non consequat. Nullam consectetur rutrum egestas.";
  console.log(params);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ marginRight: "20px" }}>
        <img
          src="https://www.planetware.com/photos-large/F/france-paris-notre-dame-cathedral.jpg"
          alt="destination"
          width="380px"
        />
      </Box>
      <Box sx={{ maxWidth: "500px" }}>
        <Typography variant="body2">
          <span style={{ fontWeight: "bold" }}>Created by: </span>
          <span style={{ color: "#1976d2", cursor: "pointer" }}>Amine </span>
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "5px" }}>
          Destination name
        </Typography>
        <StarRating rating={4} />
        <Box sx={{ marginBottom: "10px" }}>
          <Typography
            variant="body2"
            sx={{ color: "#707070", fontSize: "13px" }}
          >
            Restaurants . Bars . cafés
          </Typography>
        </Box>
        <Typography variant="body2">
          {description.length > 100 ? (
            <Box>
              {descriptionOpen ? description : description.slice(0, 200)}{" "}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    // fontWeight: "bold",
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#707070",
                  }}
                  onClick={() => setDescriptionOpen(!descriptionOpen)}
                >
                  {descriptionOpen ? "hide" : "see more"}
                </Typography>
              </Box>
            </Box>
          ) : (
            description
          )}
        </Typography>
      </Box>
    </Box>
  );
};
export default Destination;
