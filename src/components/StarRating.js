import { Box } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const StarRating = ({ rating, max }) => {
  const stars = [];
  const maxRating = 5;
  if (max) maxRating = max;
  if (rating) {
    const intRating = Math.floor(rating);
    for (let i = 0; i < intRating; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FFC000" }} />);
    }
    for (let i = 0; i < maxRating - intRating; i++) {
      stars.push(<StarIcon key={intRating} style={{ color: "#DEDEDE" }} />);
    }
  } else {
    for (let i = 0; i < maxRating; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#DEDEDE" }} />);
    }
  }

  return <Box sx={{ height: "26px" }}>{stars}</Box>;
};

export default StarRating;
