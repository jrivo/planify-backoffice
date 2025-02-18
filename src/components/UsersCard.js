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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const UsersCard = ({ imageUrl, id, name, email, role, status, setIndex }) => {
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
      navigate("/users?page=" + currentPage);
    }
  };

  const verifyUser = async (id) => {
    const response = await changeUserStatus(
      id,
      status === "VERIFIED" ? "UNVERIFIED" : "VERIFIED"
    );
    if (response.status === 200) {
      navigate("/users?page=" + currentPage);
    }
  };

  const removeUser = async (id) => {
    console.log("remove user -*------------------");
    setAlertOpen(false);
    setIndex((prev) => prev + 1);
    deleteUser(id);
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
        action={() => removeUser(id)}
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

      {(localStorage.getItem("role") === "ADMIN" ||
        (localStorage.getItem("role") === "MODERATOR" && role !== "ADMIN")) && (
        <Box
          sx={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {console.log("should show")}
          <Box
            alignItems="center"
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="text"
              sx={{
                width: "90px",
                display: "flex",
                justifyContent: "flex-start",
                color: "#000",
                textTransform: "none",
              }}
              onClick={() => {
                navigate(`/users/${id}`);
              }}
            >
              {localStorage.getItem("role") === "ADMIN" ? (
                <>
                  <EditIcon sx={{ fontSize: 16 }} />
                  <span style={{ marginLeft: "5px" }}>Edit</span>
                </>
              ) : (
                <>
                  <PersonSearchIcon sx={{ fontSize: 16 }} />
                  <span style={{ marginLeft: "5px" }}>Details</span>
                </>
              )}
            </Button>
            {localStorage.getItem("role") === "ADMIN" && (
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
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection:
                localStorage.getItem("role") === "ADMIN" ? "row" : "column",
            }}
          >
            <Button
              variant="text"
              sx={{
                width: "90px",
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
            {status !== "VERIFIED" && status !== "BANNED" && (
              <Button
                variant="text"
                sx={{
                  width: "100px",
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#000",
                  textTransform: "none",
                }}
                onClick={() => verifyUser(id)}
              >
                <CheckIcon sx={{ fontSize: 16 }} />
                <span style={{ marginLeft: "5px" }}>Verify</span>
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UsersCard;
