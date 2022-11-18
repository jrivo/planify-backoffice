import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "../components/general/Button";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const primaryColor = process.env.REACT_APP_PRIMARY_COLOR;
  const primaryLighterColor = process.env.REACT_APP_PRIMARY_LIGHTER_COLOR;
  console.log("primaryColor is ", primaryColor);
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
          }}
        >
          <img
            src="/planify-logo-transparent-no-text.png"
            alt="Planify logo"
            width="100px"
          />
        </Box>

        <Container maxWidth="sm">
          <form
            onSubmit={() => {
              console.log("give us nothing");
            }}
          >
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
                sx={{
                  fontSize: "20px",
                }}
              >
                Fill in the form to create your account
                {process.env.REACT_APP_TRY}
              </Typography>
            </Box>
            <Grid container columnSpacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                  value={lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="first name"
                  margin="normal"
                  name="firstName"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                  value={firstName}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Birth date"
                  margin="normal"
                  name="birthDate"
                  onChange={(event) => {
                    setBirthDate(event.target.value);
                  }}
                  value={birthDate}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email address"
                  margin="normal"
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                  value={email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  type="password"
                  value={password}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Confirm password"
                  margin="normal"
                  name="confirmPassword"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  type="password"
                  value={confirmPassword}
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>
            </Grid>

            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              style={{
                marginTop: "20px",
              }}
            >
              Sign up now
            </Button>

            <Typography
              color="textSecondary"
              variant="body2"
              style={{ marginTop: "20px" }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>

      <Stack
        sx={{ width: "100%", position: "absolute", bottom: "10px" }}
        spacing={2}
      >
        <Alert
          severity="error"
          onClose={() => {
            setError(false);
          }}
        >
          An error occured
        </Alert>
      </Stack>
    </>
  );
};

export default Signup;
