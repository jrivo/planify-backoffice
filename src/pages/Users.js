import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import UsersCard from "../components/UsersCard";
import { getAllUsers } from "../utils.js/apicalls";

const Users = () => {
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    const users = await getAllUsers();
    setUsers(
      users.map((user) => {
        return {
          name: user.firstName + " " + user.lastName,
          email: user.email,
          role: user.role,
        };
      })
    );
  };

  useEffect(() => {
    loadData();
  }, []);

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
              sx={{ marginTop: "24px", height: "60vh", overflow: "scroll" }}
            >
              {users.map((user) => (
                <UsersCard {...user} />
              ))}
              {users.map((user) => (
                <UsersCard {...user} />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Users;
