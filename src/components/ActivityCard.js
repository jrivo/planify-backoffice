import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ActionAreaCard = ({ title, date, image, address, price, ...rest }) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 250 }} {...rest}>
      <CardActionArea {...rest}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              // fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            {date}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: "5px",
            }}
          >
            {address}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: "bold",
            }}
          >
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
