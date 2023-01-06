import { Box, Typography } from "@mui/material";
import Avatar from "../Avatar";
import { getFormattedDate, getFormattedTime } from "../../utils.js/format";

const ActivityCard = ({ person, action, thing, date, image, style, sx }) => {
  const textStyle = {
    // dark grey
    color: "#4F4F4F",
    fontSize: "14px",
    // fontWeight: "300",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
        ...style,
      }}
    >
      {/* avatar container */}
      <Box>
        <Avatar
          name={person}
          image={image}
          // make avatar bigger
          sx={{ width: 60, height: 60, marginRight: "15px" }}
        />
      </Box>

      {/* text container */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ ...textStyle, fontWeight: "bold", marginRight: "5px" }}
          >
            {person}
          </Typography>{" "}
          <Typography sx={textStyle}>{action}</Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              ...textStyle,
            }}
          >
            « {thing} »
          </Typography>
        </Box>
        <Box>
          <Typography sx={textStyle}>
            {getFormattedDate(date)} {getFormattedTime(date)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityCard;
