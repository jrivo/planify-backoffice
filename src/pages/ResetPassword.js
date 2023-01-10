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
import { resetPassword } from "../utils.js/apicalls";
import SuccessBox from "../components/general/SuccessBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const response = await resetPassword({ email: email });
    setEmailSent(true);
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
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.3)",
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
          }}
        >
          {emailSent ? (
            <SuccessBox
              message="Email sent successfully"
              link={{
                label: "Go to login page",
                path: "/login",
              }}
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
                  Forgot your password ?
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  Enter your email address and we'll send you a link to reset
                  your password
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
                Request password reset
              </Button>

              <Typography
                color="textSecondary"
                variant="body2"
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <Link
                  href="/login"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Go to login page
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

export default ResetPassword;
