import { Box, Card, CardContent, Typography } from "@mui/material";
import Map from "../components/Map";
import UsersCard from "../components/UsersCard";

const Users = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        marginLeft: "30px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          Users
        </Typography>
      </Box>

      <Card
        sx={{
          width: "80%",
        }}
      >
        <CardContent>
          <Box pt={1} pb={2} px={2}>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ marginTop: "24px" }}
            >
              <UsersCard
                name="oliver liam"
                company="viking burrito"
                email="oliver@burrito.com"
                vat="FRB1235476"
              />
              <UsersCard
                name="lucas harper"
                company="stone tech zone"
                email="lucas@stone-tech.com"
                vat="FRB1235476"
              />
              <UsersCard
                name="ethan james"
                company="fiber notion"
                email="ethan@fiber.com"
                vat="FRB1235476"
                noGutter
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Users;
