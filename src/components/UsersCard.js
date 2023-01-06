import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Box, Button, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils.js/format";
import { changeUserStatus, deleteUser } from "../utils.js/apicalls";
import { useLocation } from "react-router-dom";
import AlertDialog from "./general/AlertDialog";
import { useState } from "react";

const UsersCard = ({ imageUrl, id, name, email, role, status }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // get current page number
  const currentPage = location.search.split("=")[1] || 1;
  const [alertOpen, setAlertOpen] = useState(false);

  const banUnbanUser = async (id) => {
    const response = await changeUserStatus(
      id,
      status === "BANNED" ? "VERIFIED" : "BANNED"
    );
    if (response.status === 200) {
      // reload the page
      navigate("/users?page=" + currentPage);
    }
  };

  const removeUser = async (id) => {
    const response = await deleteUser(id);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setAlertOpen(false);
      navigate("/users?page=" + currentPage);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        marginBottom: "30px",
        position: "relative",
      }}
    >
      <AlertDialog
        message="Do you really want to delete this user?"
        open={alertOpen}
        setOpen={setAlertOpen}
        action={() => {
          removeUser(id);
        }}
      />

      <Avatar
        src={imageUrl}
        style={{
          borderRadius: "50%",
          marginRight: "30px",
          width: "80px",
          height: "80px",
        }}
      />
      <Box width="100%" display="flex" flexDirection="column">
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>

        <Box>
          <Typography variant="caption">
            Status:
            <Typography
              variant="caption"
              sx={{
                marginLeft: "10px",
                fontWeight: "bold",
                color:
                  status === "BANNED"
                    ? "red"
                    : status === "VERIFIED"
                    ? "green"
                    : "orange",
              }}
            >
              {capitalize(status)}
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            Email:
            <Typography
              variant="caption"
              sx={{ marginLeft: "10px", fontWeight: "bold" }}
            >
              {email}
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            Role:
            <Typography
              variant="caption"
              sx={{ marginLeft: "10px", fontWeight: "bold" }}
            >
              {role}
            </Typography>
          </Typography>
        </Box>
      </Box>
      {/* buttons container */}
      <Box
        sx={{
          position: "absolute",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Box
          alignItems="center"
          sx={{
            display: "flex",
          }}
        >
          <Box>
            <Button
              sx={{
                color: "red",
                textTransform: "none",
                width: "100px",
                display: "flex",
                justifyContent: "flex-start",
              }}
              onClick={() => setAlertOpen(true)}
            >
              <DeleteIcon sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "5px" }}>Delete</span>
            </Button>
          </Box>
          <Button
            variant="text"
            sx={{
              width: "100px",
              display: "flex",
              justifyContent: "flex-start",
              color: "#000",
              textTransform: "none",
            }}
            onClick={() => {
              navigate(`/users/${id}`);
            }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
            <span style={{ marginLeft: "5px" }}>Edit</span>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box>
            <Button
              variant="text"
              sx={{
                width: "100px",
                display: "flex",
                justifyContent: "flex-start",
                color: "#000",
                textTransform: "none",
              }}
              onClick={() => banUnbanUser(id)}
            >
              <BlockIcon sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "5px" }}>
                {status === "BANNED" ? "Unban" : "ban"}
              </span>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersCard;
