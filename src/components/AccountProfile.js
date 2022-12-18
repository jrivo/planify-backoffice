import { useState, useEffect } from "react";
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
import { updateUserInfo } from "../utils.js/apicalls";

export default function AccountProfile({ data, ...rest }) {
  const Input = styled("input")({
    display: "none",
  });

  const handleImageChange = async (e) => {
    const images = e.target.files;
    console.log(images);
    const formData = new FormData();
    formData.append("images", images[0]);
    const response = await updateUserInfo(data.id, formData);
    console.log(response);
    // wait 1 second before reloading the page
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Card {...rest}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={data?.profilePicture?.url && data.profilePicture.url}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />

          <Typography color="textPrimary" gutterBottom variant="h5">
            {data?.firstName} {data?.lastName}
          </Typography>

          <Typography color="textSecondary" variant="body2">
            {data?.role}
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
            onChange={handleImageChange}
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
