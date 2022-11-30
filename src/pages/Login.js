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
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.statusCode === 401) {
        setError("Invalid email or password");
        return;
      }
      navigate("/");

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("email", JSON.stringify(data.email));
    } catch (error) {
      console.log(error);
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
          justifyItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {/* <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 50,
          }}
        >
          <img
            src="/planify-logo-transparent-no-text.png"
            alt="Planify logo"
            width="100px"
          />
        </Box> */}

        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
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

            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              style={{
                marginTop: "20px",
              }}
            >
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
        </Container>
      </Box>
    </>
  );
};

export default Login;
