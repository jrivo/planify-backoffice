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
      console.log(data.statusCode);
      if (data.statusCode === 401 || data.statusCode === 400) {
        setError(
          data.message && typeof data.message === "string"
            ? data.message
            : "Invalid email or password"
        );
        return;
      } else if (data.statusCode === 500) {
        setError("Server error");
        return;
      } else {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", data.role);
        console.log("role", data.role);
        navigate("/");
      }
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
        {/* background Image  with overalay*/}

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

                <Typography
                  color="textSecondary"
                  variant="body2"
                  style={{ marginTop: "20px" }}
                >
                  {/* Don't have an account?{" "} */}
                  <Link
                    href="/reset-password"
                    variant="subtitle2"
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    Reset password
                  </Link>
                </Typography>
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
