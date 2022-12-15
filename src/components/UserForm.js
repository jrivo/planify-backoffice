import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AccountProfile from "./AccountProfile";
import AccountProfileDetails from "./AccountProfileDetails";
import { getCurrentUser, getUser } from "../utils.js/apicalls";

const UserForm = ({ id }) => {
  const [profileData, setProfileData] = useState({});
  const [profileDetailsChanged, setProfileDetailsChanged] = useState(0);

  const loadCurrentUser = async () => {
    const currentUser = await getCurrentUser();
    setProfileData(currentUser);
    console.log(currentUser);
  };

  const loadUser = async () => {
    const user = await getUser(id);
    setProfileData(user);
    console.log(user);
  };

  useEffect(() => {
    if (id) loadUser();
    else loadCurrentUser();
  }, [profileDetailsChanged]);

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
