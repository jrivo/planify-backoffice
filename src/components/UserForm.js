import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AccountProfile from "./AccountProfile";
import AccountProfileDetails from "./AccountProfileDetails";
import { getCurrentUser, getUser } from "../utils.js/apicalls";

const UserForm = ({ id }) => {
  const [profileData, setProfileData] = useState({});
  const [profileDetailsChanged, setProfileDetailsChanged] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCurrentUser = async () => {
    const currentUser = await getCurrentUser();
    setProfileData(currentUser);
    setLoading(false);
  };

  const loadUser = async () => {
    const user = await getUser(id);
    setProfileData(user);
    setLoading(false);
  };

  useEffect(() => {
    if (id) loadUser();
    else loadCurrentUser();
  }, [profileDetailsChanged]);

  if (loading)
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={100}
      />
    );

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "50px",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "28px",
                fontWeight: "300",
              }}
            >
              Account
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile data={profileData} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails
                id={id}
                data={profileData}
                profileDetailsChanged={profileDetailsChanged}
                setProfileDetailsChanged={setProfileDetailsChanged}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserForm;
