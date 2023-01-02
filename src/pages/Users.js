import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import UsersCard from "../components/UsersCard";
import { getAllUsers } from "../utils.js/apicalls";
import Pagination from "@mui/material/Pagination";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = location.search.split("=")[1] || 1;

  const loadData = async () => {
    const users = await getAllUsers({
      limit: 3,
      page: currentPage && currentPage,
    });
    console.log("users", users);
    setTotalPages(users.totalPages);
    setUsers(
      users.users.map((user) => {
        return {
          id: user.id,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          role: user.role,
          imageUrl: user?.profilePicture?.url && user.profilePicture.url,
        };
      })
    );
  };

  useEffect(() => {
    loadData();
  }, [location]);

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

      <Box
        sx={{
          width: "80%",
        }}
      >
        <Box pt={1} pb={2} px={2}>
          <Box
            display="flex"
            flexDirection="column"
            // sx={{ marginTop: "24px", height: "60vh", overflow: "scroll" }}
          >
            {users.map((user) => (
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  paddingTop: "32px",
                  paddingLeft: "40px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <UsersCard {...user} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          onChange={(e, page) => {
            navigate("/users?page=" + page);
          }}
          // selected={currentPage}
          page={currentPage}
        />
      </Stack>
    </Box>
  );
};

export default Users;
