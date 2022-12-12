import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";

const HorizontalCard = ({
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
    <Card
      sx={{
        maxWidth: 500,
        minWidth: 250,
        borderRadius: "15px",
        ...style,
        ...sx,
      }}
      {...rest}
    >
      <CardActionArea {...rest}>
        <CardContent
          sx={{ margin: 0, padding: 0, display: "flex", width: "300px" }}
        >
          <CardMedia component="img" height="170" image={image} />

          <Box
            sx={{
              marginLeft: "30px",
              minWidth: "100%",
              padding: "20px 0px 20px 0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontSize: "15px",
                  marginBottom: "10px",
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
            </Box>

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
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HorizontalCard;
