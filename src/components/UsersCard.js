import PropTypes from "prop-types";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import MessageIcon from "@mui/icons-material/Message";

const UsersCard = ({ name, email, role }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
        marginBottom: "30px",
        position: "relative",
      }}
    >
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
            Name:
            <Typography
              variant="caption"
              sx={{ marginLeft: "10px", fontWeight: "bold" }}
            >
              {name}
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
          {/* <Box>
            <Button
              variant="text"
              sx={{
                width: "100px",
                display: "flex",
                justifyContent: "flex-start",
                color: "#000",
                textTransform: "none",
              }}
            >
              <MessageIcon sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "5px" }}>Message</span>
            </Button>
          </Box> */}
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
            >
              <BlockIcon sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "5px" }}>Block</span>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersCard;
