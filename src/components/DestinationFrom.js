import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Button from "./general/Button";

export default function AccountProfileDetails(props) {
  const [data, setData] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [ProfileType, setProfileType] = useState("");

  return (
    <form autoComplete="off" noValidate {...props}>
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
                  label="Date of birth"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Profile type"
                  name="ProfileType"
                  value={ProfileType}
                  onChange={(e) => setProfileType(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
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
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              console.log("yes give us nothing sis");
            }}
          >
            Update profile
          </Button>
        </Box>
      </Card>
    </form>
  );
}
