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
import { updateUserInfo } from "../utils.js/apicalls";

export default function AccountProfileDetails({
  id,
  data,
  profileDetailsChanged,
  setProfileDetailsChanged,
  ...rest
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      value: "ADMIN",
    },
    {
      id: 2,
      name: "User",
      value: "USER",
    },
    {
      id: 3,
      name: "Moderator",
      value: "MODERATOR",
    },
    {
      id: 4,
      name: "Merchant",
      value: "MERCHANT",
    },
  ]);

  useEffect(() => {
    setFirstName(data?.firstName);
    setLastName(data?.lastName);
    setEmail(data?.email);
    setPhone(data?.phone);
    setRole(data?.role);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("phoneNumber", phone);
    updateUserInfo(data.id, formData);

    // change value of message for one second then set it back to empty string
    setProfileDetailsChanged(profileDetailsChanged + 1);
    setMessage(
      <Alert severity="success" sx={{ marginTop: "20px" }}>
        profile updated successfully
      </Alert>
    );
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <form autoComplete="off" noValidate {...rest} onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Profile" />

        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  InputLabelProps={{ shrink: true }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  InputLabelProps={{ shrink: true }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                {id && (
                  <Select
                    fullWidth
                    label="Role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.value}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </Grid>
            </>
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
            Update profile
          </Button>
        </Box>
      </Card>
      {message}
    </form>
  );
}
