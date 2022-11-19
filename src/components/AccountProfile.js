import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "./general/Button";

export default function AccountProfile(props) {
  const [avatar, setAvatar] = React.useState("");
  const Input = styled("input")({
    display: "none",
  });

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />

          <Typography color="textPrimary" gutterBottom variant="h5">
            John Doe
          </Typography>

          <Typography color="textSecondary" variant="body2">
            10 rue de la paix
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "center" }}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component="span"
          >
            Charger une photo
          </Button>
        </label>
      </CardActions>
    </Card>
  );
}
