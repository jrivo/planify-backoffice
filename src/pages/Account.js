import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AccountProfile from "../components/AccountProfile";
import AccountProfileDetails from "../components/AccountProfileDetails";
import { getCurrentUser } from "../utils.js/apicalls";

const Account = () => {
  const [profileData, setProfileData] = useState({});
  const loadData = async () => {
    const currentUser = await getCurrentUser();
    setProfileData(currentUser);
    console.log(currentUser);
  };

  useEffect(() => {
    loadData();
  }, []);
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
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile data={profileData} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails data={profileData} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
