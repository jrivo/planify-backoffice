import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const ContentBox = ({
  title,
  subtitle1,
  image,
  subtitle2,
  footerText,
  style,
  sx,
  ...rest
}) => {
  return (
    <Box
      sx={{
        // maxWidth: 210,
        ...style,
        ...sx,
      }}
      className="card-container"
      {...rest}
    >
      <img
        component="img"
        // height="130"
        width="210"
        src={image}
        style={{
          marginTop: "10px",
        }}
      />
      <Box
        sx={{
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            marginTop: "5px",
            fontSize: "15px",
            marginBottom: "0px",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: "0px",
          }}
        >
          {subtitle1}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: "5px",
          }}
        >
          {subtitle2}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: "bold",
          }}
        >
          {footerText}
        </Typography>
      </Box>
    </Box>
  );
};

// this is how you call the component

export default ContentBox;
