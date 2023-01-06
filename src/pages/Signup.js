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
import { signup } from "../utils.js/apicalls";
import { useNavigate } from "react-router-dom";
import SuccessBox from "../components/general/SuccessBox";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const primaryColor = process.env.REACT_APP_PRIMARY_COLOR;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = await signup({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: "MERCHANT",
    });

    console.log("signup data", data);
    if (data.status === 401) {
      setError("A user with this email already address exists");
      return;
    } else if (data.status === 200 || data.status === 201) {
      setSubmitted(true);
    } else {
      setError("Server error");
      return;
    }
  };

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
            backgroundColor: "rgba(0,0,0,0.3)",
            // backgroundColor: "red",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: -500,
          }}
        ></Box>

        <Box
          sx={{
            backgroundImage: "url(/login-background.jpg)",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: -501,
          }}
        ></Box>

        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "#FFF",
            border: "none",
            padding: "20px  50px 44px 50px",
            borderRadius: "10px",
            // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
            // paddingBottom: "24px",
          }}
        >
          {submitted ? (
            <SuccessBox
              message="Your account has been created successfully, please verify your email address to login."
              link={{ path: "/login", label: "Go to login page" }}
            />
          ) : (
            <form onSubmit={handleSubmit}>
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
                {/* <Grid item md={6} xs={12}>
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
              </Grid> */}
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
              {error && (
                <Stack sx={{ width: "100% ", marginTop: "20px" }} spacing={2}>
                  <Alert
                    severity="error"
                    onClose={() => {
                      setError(false);
                    }}
                  >
                    {error}
                  </Alert>
                </Stack>
              )}
            </form>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Signup;
