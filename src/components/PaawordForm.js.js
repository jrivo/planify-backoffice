import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "./general/Button";
import { updatePassword, updateUserInfo } from "../utils.js/apicalls";

export default function PasswordForm({
  id,
  data,
  profileDetailsChanged,
  setProfileDetailsChanged,
  ...rest
}) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updatePassword(data.id, { password });
    if (response.status === 200) {
      setMessage(
        <Alert severity="success">Password updated successfully</Alert>
      );
    } else {
      setMessage(<Alert severity="error">Error updating password</Alert>);
    }
    console.log(response);
  };

  return (
    <form autoComplete="off" noValidate {...rest} onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Update Password" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                type="password"
                fullWidth
                label="Password"
                name="password"
                InputLabelProps={{ shrink: true }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Update password
          </Button>
        </Box>
      </Card>
      {message}
    </form>
  );
}
