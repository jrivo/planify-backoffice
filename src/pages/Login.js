import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "../components/general/Button";

const Login = () => {
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

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          justifyItems: "center",
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
                Sign in to your account
              </Typography>
            </Box>
            <Grid container columnSpacing={3}>
              <Grid item md={12} xs={12}>
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
              <Grid item md={12} xs={12}>
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
            </Grid>

            <Button color="primary" fullWidth size="large" type="submit">
              Sign in
            </Button>

            <Typography
              color="textSecondary"
              variant="body2"
              style={{ marginTop: "20px" }}
            >
              Don't have an account?{" "}
              <Link
                href="/signup"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign up
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

export default Login;
